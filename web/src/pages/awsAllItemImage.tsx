import AWS from 'aws-sdk';

const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  region: 'ap-northeast-1',
};

AWS.config.update(credentials);
const s3 = new AWS.S3(credentials);

// オブジェクトリストのキャッシュ
let objectListCache: string[] | null = null;

// 期限付きURLの生成
function generatePresignedUrl(bucketName: string, key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 3600 // 有効期限（秒単位）
  };
  return s3.getSignedUrl('getObject', params);
}

// 特定のS3フォルダ内のすべてのオブジェクトを取得して期限付きURLを生成
async function generatePresignedUrlsForFolder(bucketName: string, folderPath: string) {
  try {
    if (!objectListCache) {
      // キャッシュがない場合はオブジェクトリストを取得し、キャッシュする
      const objects = await s3.listObjectsV2({ Bucket: bucketName, Prefix: folderPath }).promise();
      if (objects && objects.Contents) {
        objectListCache = objects.Contents
        .filter(obj => obj.Key !== undefined)
        .map(obj => obj.Key!);
      } else {
        objectListCache = [];
      }
    }

    // キャッシュされたオブジェクトリストからURLを生成
    const presignedUrls = objectListCache.map(key => generatePresignedUrl(bucketName, key!));
    return presignedUrls;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export { generatePresignedUrlsForFolder };