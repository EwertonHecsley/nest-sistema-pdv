import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service/prisma.service';
import { CPedidos, PedidoDto } from './dto/pedido.dto';
import { MetodosExtras } from './utils/metodosExtras';

@Injectable()
export class PedidosService {
    constructor(
        private readonly prismaService: PrismaService, private readonly metodosExtras: MetodosExtras) { }

    async createPedido(dataPedido: PedidoDto) {
        const { cliente_id, pedido_produtos, observacao } = dataPedido;

        const produtoNaCesta = await this.prismaService.produto.findMany({
            where: {
                id: {
                    in: pedido_produtos.map(item => item.produto_id)
                }
            }
        })

        const { valorPedido, resposta } = await this.calcularValorPedido(pedido_produtos, produtoNaCesta)

        const { id } = await this.metodosExtras.inserirPedidoNoBanco(cliente_id, valorPedido, observacao);

        await this.metodosExtras.inserirProdutosDoPedido(resposta, id);

    }

    async calcularValorPedido(pedido_produtos: CPedidos[], produtoNaCesta: any[]) {
        let valorPedido = 0;
        const resposta = [];

        for (let cestaProduto of pedido_produtos) {
            const produto = produtoNaCesta.find(p => p.id === cestaProduto.id);
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
}

