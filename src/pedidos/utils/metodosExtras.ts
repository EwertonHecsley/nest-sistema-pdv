import { PrismaService } from "src/database/prisma-service/prisma.service";

export class MetodosExtras {
    constructor(private readonly prismaService: PrismaService) { }

    async inserirPedidoNoBanco(cliente_id: number, valor_total: number, observacao?: string) {
        return await this.prismaService.pedido.create({
            data: {
                cliente_id,
                valor_total,
                observacao
            }, select: {
                id: true
            }
        })
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
            });
        };
    };
};