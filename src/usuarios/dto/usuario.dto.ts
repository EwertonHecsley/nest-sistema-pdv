import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UsuarioDto {
    @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
    @IsString()
    nome: string;

    @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
    @IsString()
    @IsEmail({}, { message: 'Formato de e-mail inválido.' })
    emal: string;

    @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
    @IsString()
    @MinLength(4, { message: 'O campo senha deve ter no mínimo 4 caracteres.' })
    senha: string;


    id?: number;
}