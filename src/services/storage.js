import dotenv from "dotenv";
dotenv.config();
import s3 from "../config/bucket.js";

const uploadPicture = async ({ buffer, mimetype }, path) => {
  const picture = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Body: buffer,
      Key: path,
      ContentType: mimetype,
    })
    .promise();

  return {
    // url: picture.Location,
    url: "https://s3.us-east-005.backblazeb2.com/media-barberShop/service/65932654782e7c44c2bfe3f7/1704236943046.jpeg",
    //picturePath: picture.Key,
    picturePath: "service/65932654782e7c44c2bfe3f7/1704236943046.jpeg",
  };
};

const removePicture = async (filePath) => {
  await s3.deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
  }).promise();
};

export { uploadPicture, removePicture };
