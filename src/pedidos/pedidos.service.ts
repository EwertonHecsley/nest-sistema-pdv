import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { CPedidos, PedidoDto } from './dto/pedido.dto';

@Injectable()
export class PedidosService {
    constructor(
        private readonly prismaService: PrismaService) { }

    async createPedido(dataPedido: PedidoDto) {
        const { cliente_id, pedido_produtos, observacao } = dataPedido;

        await this.verifyProdutosExistAndQuantity(pedido_produtos);

        const produtosNaCesta = await this.prismaService.produto.findMany({
            where: {
                id: {
                    in: pedido_produtos.map(p => p.produto_id)
                }
            }
        });

        const { valorPedido, resposta } = await this.calcularValorPedido(pedido_produtos, produtosNaCesta);

        const { id } = await this.inserirPedidoNoBanco(cliente_id, valorPedido, observacao);

        await this.inserirProdutosDoPedido(resposta, id);

    }

    async verifyProdutosExistAndQuantity(pedido_produto: any[]) {
        const produtosDatabase = await this.prismaService.produto.findMany();

        for (const p of pedido_produto) {
            const { produto_id, quantidade_produto } = p;
            const produto = produtosDatabase.find(p => p.id === produto_id);
            if (!produto) throw new HttpException(`Produto ${produto_id} não encontrado.`, HttpStatus.NOT_FOUND);
            if (produto.quantidade_estoque < quantidade_produto) throw new HttpException(`Quantidade do produto: ${produto_id} insuficiente.`, HttpStatus.BAD_REQUEST);
        }
    }

    async calcularValorPedido(pedido_produtos: CPedidos[], produtoNaCesta: any[]) {
        let valorPedido = 0;
        const resposta = [];

        for (let cestaProduto of pedido_produtos) {
            const produto = produtoNaCesta.find(p => p.id === cestaProduto.produto_id);
            if (produto) {
                valorPedido += cestaProduto.quantidade_produto * produto.valor;
                resposta.push({
                    produto_id: produto.id,
                    quantidade_produto: cestaProduto.quantidade_produto,
                    valor_produto: produto.valor
                });
            };
        };

        return { valorPedido, resposta };
    }

    async inserirPedidoNoBanco(cliente_id: number, valor_total: number, observacao?: string) {
        return await this.prismaService.pedido.create({
            data: {
                cliente_id,
                valor_total,
                observacao
            }, select: {
                id: true
            }
        });
    }

    async inserirProdutosDoPedido(resposta: any[], pedido_id: number) {
        for (let index of resposta) {
            await this.prismaService.pedidoProduto.create({
                data: {
                    pedido_id,
                    ...index
                }
            });
            await this.prismaService.produto.update({
                where: {
                    id: index.produto_id
                },
                data: {
                    quantidade_estoque: {
                        decrement: index.quantidade_produto
                    }
                }
            })
        }
    }

    async listAllPedidos() {
        const linhas = await this.prismaService.pedido.findMany({
            include: {
                pedido_produto: true
            }
        });

        console.log(linhas);
        console.log(linhas[0].pedido_produto)


        const resposta: any[] = [];
        let pedidoAtual: any = null;

        for (let linha of linhas) {
            if (!pedidoAtual || linha['id'] !== pedidoAtual.id) {
                pedidoAtual = {
                    id: linha['id'],
                    valor_total: linha['valor_total'],
                    observacao: linha['observacao'],
                    cliente_id: linha['cliente_id'],
                    pedido_produto: []
                };
                resposta.push({ pedido: pedidoAtual });
            }

            pedidoAtual.pedido_produto.push({
                id: linha['pedido_produto'][0]?.['id'],
                quantidade_produto: linha['pedido_produto'][0]?.['quantidade_produto'],
                valor_produto: linha['pedido_produto'][0]?.['valor_produto'],
                produto_id: linha['pedido_produto'][0]?.['produto_id']
            });
        };

        return resposta;
    }
}

