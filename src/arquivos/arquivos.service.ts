import { Injectable } from '@nestjs/common';
import s3 from '../arquivos/bucketConfig/aws.config';

@Injectable()
export class ArquivosService {
    async upload(path: string, buffer: Buffer, mimeType: string) {
        const imagem = await s3.upload({
            Bucket: process.env.BUCKET_KEY_NAME,
            Key: path,
            Body: buffer,
            ContentType: mimeType
        }).promise()

        return {
            path: imagem.Key,
            url: `https://${process.env.BUCKET_KEY_NAME}.${process.env.BUCKET_ENDPOINT}/${imagem.Key}`
        }
    }

    async getFile(id: number) {
        const imagem = await s3.listObjects({
            Bucket: process.env.BUCKET_KEY_NAME,
            Prefix: `produtos/${id}`
        }).promise();

        return imagem.Contents;
    }
}
