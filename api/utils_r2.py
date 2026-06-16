import boto3
from botocore.exceptions import NoCredentialsError
from config import settings

def get_r2_client(account_id=None, access_key=None, secret_key=None):
    # Fallback logic: Use provided keys or global settings
    final_account_id = account_id or settings.R2_ACCOUNT_ID
    final_access_key = access_key or settings.R2_ACCESS_KEY_ID
    final_secret_key = secret_key or settings.R2_SECRET_ACCESS_KEY

    return boto3.client(
        's3',
        endpoint_url=f'https://{final_account_id}.r2.cloudflarestorage.com',
        aws_access_key_id=final_access_key,
        aws_secret_access_key=final_secret_key,
        region_name='auto'
    )

def upload_to_r2(file_content, file_name, content_type, account_id=None, access_key=None, secret_key=None, bucket_name=None):
    client = get_r2_client(account_id, access_key, secret_key)
    final_bucket = bucket_name or settings.R2_BUCKET_NAME
    
    try:
        client.put_object(
            Bucket=final_bucket,
            Key=file_name,
            Body=file_content,
            ContentType=content_type
        )
        # Construct public URL based on bucket/account if available
        # This part might need the retailer's custom public URL if provided
        return f"{settings.R2_PUBLIC_URL}/{file_name}"
    except NoCredentialsError:
        return None
