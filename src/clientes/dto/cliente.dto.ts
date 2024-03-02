import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ClienteDto {

    @IsNotEmpty({ message: 'O campo nome não pode ser vazio.' })
    @IsString()
    nome: string;

    @IsNotEmpty({ message: 'O campo e-mail não pode ser vazio.' })
    @IsString()
    @IsEmail({}, { message: 'O campo e-mail não pode ser vazio.' })
    email: string;

    @IsNotEmpty({ message: 'O campo cpf não pode ser vazio.' })
    @IsString()
    cpf: string;

    @IsString()
    cep?: string;

    @IsString()
    rua?: string;

    @IsString()
    numero?: string;

    @IsString()
    bairro?: string;

    @IsString()
    cidade?: string;

    @IsString()
    estado?: string;

    @IsString()
    id?: number;
}