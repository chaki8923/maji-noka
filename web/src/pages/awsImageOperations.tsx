// aws.ts
import AWS from 'aws-sdk';

const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  region: 'ap-northeast-1',
};

AWS.config.update(credentials);

// S3 オブジェクトの生成
const s3 = new AWS.S3();

export const getImageUrl = async (bucketName: string, objectKey: string, expirationTimeInSeconds: number): Promise<string> => {
  console.log("objectKey", objectKey);
  
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Expires: expirationTimeInSeconds // 期限切れの時間
  };
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};
