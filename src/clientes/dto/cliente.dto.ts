import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

    @IsOptional()
    @IsString()
    cep?: string;

    @IsOptional()
    @IsString()
    rua?: string;

    @IsOptional()
    @IsString()
    numero?: string;

    @IsOptional()
    @IsString()
    bairro?: string;

    @IsOptional()
    @IsString()
    cidade?: string;

    @IsOptional()
    @IsString()
    estado?: string;

    id?: number;
}
