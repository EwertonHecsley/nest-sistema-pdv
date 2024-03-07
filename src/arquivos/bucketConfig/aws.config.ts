import aws from 'aws-sdk';

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    }
})