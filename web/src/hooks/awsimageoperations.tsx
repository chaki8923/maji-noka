// aws.ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY || '',
  },
  region: 'ap-northeast-1',
});

export const getImageUrl = async (bucketName: string, objectKey: string, expirationTimeInSeconds: number): Promise<string> => {
  
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: expirationTimeInSeconds });
    return signedUrl;
  } catch (err) {
    console.error('Error getting signed URL:', err);
    throw err;
  }
};

