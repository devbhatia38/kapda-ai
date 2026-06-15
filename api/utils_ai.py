import httpx
from config import settings

async def trigger_catvton(person_image_url: str, garment_image_url: str):
    """
    Triggers CatVTON on RunPod Serverless.
    Expected payload for typical CatVTON implementations.
    """
    url = f"https://api.runpod.ai/v2/{settings.RUNPOD_ENDPOINT_ID}/run"
    headers = {
        "Authorization": f"Bearer {settings.RUNPOD_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "input": {
            "person_image": person_image_url,
            "garment_image": garment_image_url,
            "cloth_type": "upper_body" # Or inferred from category
        }
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        return response.json()

async def get_runpod_status(job_id: str):
    url = f"https://api.runpod.ai/v2/{settings.RUNPOD_ENDPOINT_ID}/status/{job_id}"
    headers = {"Authorization": f"Bearer {settings.RUNPOD_API_KEY}"}
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        return response.json()
