import boto3
from botocore.exceptions import NoCredentialsError
from config import settings

def get_r2_client():
    return boto3.client(
        's3',
        endpoint_url=f'https://{settings.R2_ACCOUNT_ID}.r2.cloudflarestorage.com',
        aws_access_key_id=settings.R2_ACCESS_KEY_ID,
        aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
        region_name='auto'
    )

def upload_to_r2(file_content, file_name, content_type):
    client = get_r2_client()
    try:
        client.put_object(
            Bucket=settings.R2_BUCKET_NAME,
            Key=file_name,
            Body=file_content,
            ContentType=content_type
        )
        return f"{settings.R2_PUBLIC_URL}/{file_name}"
    except NoCredentialsError:
        return None
