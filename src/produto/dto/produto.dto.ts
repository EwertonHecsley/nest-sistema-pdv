import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProdutoDto {

    @IsNotEmpty({ message: 'O campo descrição, não pode ser vazio.' })
    @IsString()
    descricao: string;

    @IsNotEmpty({ message: 'O campo quantidade_estoque, não pode ser vazio.' })
    quantidade_estoque: number;

    @IsNotEmpty({ message: 'O campo valor, não pode ser vazio.' })
    valor: number;

    @IsNotEmpty({ message: 'O campo categoria_id, não pode ser vazio.' })
    categoria_id: number;

    @IsOptional()
    @IsString()
    produto_imagem?: string;

}