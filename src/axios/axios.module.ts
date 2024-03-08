import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import axios from 'axios';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: () => ({
                baseURL: process.env.BREVO_URL_EMAIL,
                headers: {
                    'Accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY_EMAIL,
                    'Content-Type': 'application/json'
                }
            })
        })],
    exports: [HttpModule],
})
export class AxiosModule { }
