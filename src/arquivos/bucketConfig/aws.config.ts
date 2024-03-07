import * as aws from 'aws-sdk';

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.BUCKET_ACCES_KEY_ID,
        secretAccessKey: process.env.BUCKET_APPLICATION_KEY
    }
})

export default s3;