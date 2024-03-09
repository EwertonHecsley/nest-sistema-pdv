import { Injectable } from '@nestjs/common';
import { MustacheService } from '../mustache/mustache.service';
import { axiosInstance } from '../axios/axios.config'
import * as fs from 'fs/promises';

@Injectable()
export class EmailService {
    constructor(
        private readonly mustacheService: MustacheService,
    ) { }

    async sendEmail(nome: string, email: string) {

        const template = await fs.readFile('src/view/confirmacao.pedido.html', 'utf-8');

        const variaveis = {
            nome
        }

        const conteudoHTML = this.mustacheService.render(template, variaveis);

        const data = {
            "sender": {
                "name": "Ewerton Hecsley",
                "email": "ewerton.martinscomercial@gmail.com"
            },
            "to": [
                {
                    "email": email,
                    "name": nome
                }
            ],
            "subject": "Parabéns, compra confirmada!",
            "htmlContent": conteudoHTML
        }

        return axiosInstance.post('', data);
    }
}
