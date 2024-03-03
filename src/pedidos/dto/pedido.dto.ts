import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PedidoDto {

    @IsNotEmpty({ message: 'O campo cliente_id, não pode ser vazio.' })
    @IsNumber()
    cliente_id: number;

    @IsNotEmpty({ message: 'O campo data_pedido, não pode ser vazio.' })
    @IsArray()
    pedido_produtos: CPedidos[];

    @IsOptional()
    @IsString()
    observacao?: string;

    @IsOptional()
    id?: number;
}

class CPedidos {

    @IsNotEmpty({ message: 'O campo produto_id não pode ser vazio.' })
    @IsNumber()
    produto_id: number;

    @IsNotEmpty({ message: 'O campo quantidade_produto não pode ser vazio.' })
    @IsNumber()
    quantidade_produto: number;
}