import { Injectable } from '@nestjs/common';
import { MustacheService } from '../mustache/mustache.service';
import * as fs from 'fs/promises';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    constructor(
        private readonly mustacheService: MustacheService,
    ) { }

    async sendEmail(nome: string, email: string) {

        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_KEY
            }
        })

        try {

            const template = await fs.readFile('src/view/confirmacao.pedido.html', 'utf-8');

            const variaveis = {
                nome
            }

            const conteudoHTML = this.mustacheService.render(template, variaveis);

            await transport.sendMail({
                from: 'Empresa Nest <hecsleyavschin@gmail.com>',
                to: `${email}`,
                subject: 'Compra Autorizada!',
                html: conteudoHTML
            })

        } catch (error) {
            console.log(error.message)
            return error
        }
    }
}
