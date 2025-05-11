import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

/**
 * 이미지 URL에서 이미지를 다운로드하여 S3에 업로드하는 함수
 */
export async function uploadImageToS3(
  imageUrl: string,
  recipeId: string,
): Promise<string> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`이미지 다운로드 실패: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
    const key = `recipes/${recipeId}/thumbnail.${timestamp}.jpg`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: Buffer.from(imageBuffer),
        ContentType: "image/jpeg",
      }),
    );

    return `${process.env.AWS_GUSTO_CDN_URL}/${key}`;
  } catch (error) {
    console.error("S3 이미지 업로드 중 오류 발생:", error);
    throw error;
  }
}
