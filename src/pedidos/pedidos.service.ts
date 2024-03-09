import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { CPedidos, PedidoDto } from './dto/pedido.dto';
import { EmailService } from 'src/utils/email/email.service';

@Injectable()
export class PedidosService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService
    ) { }

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
        //teste de envio de email

        console.log((await this.emailService.sendEmail("Ewerton Hecsley", "hecsleyavschin@gmail.com")).data);

        await this.emailService.sendEmail("Ewerton Hecsley", "hecsleyavschin@gmail.com")

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

    async listAllPedidos(query: string) {

        const linhas = await this.prismaService.pedido.findMany({
            include: {
                pedido_produto: true
            }
        });

        const resposta: any[] = [];

        if (query && query !== "") {
            const verifyCliente = await this.prismaService
                .cliente.findMany({
                    where: {
                        id: parseInt(query)
                    }
                });
            if (verifyCliente.length === 0) throw new HttpException('Cliente não encontrado.', HttpStatus.NOT_FOUND);

            const filtroCliente = linhas
                .filter(cliente => cliente.cliente_id === parseInt(query));

            filtroCliente.forEach(pedido => resposta.push({ pedido }))
            return resposta;
        }

        linhas.forEach(pedido => resposta.push({ pedido }))

        return resposta;

    }
}

