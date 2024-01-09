import aws from "aws-sdk"
import dotenv from "dotenv"
dotenv.config()
const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.BUCKET_KEY_ID,
        secretAccessKey: process.env.APPLICATIO_KEY
    }
})
export default s3