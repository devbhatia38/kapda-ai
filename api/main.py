from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from config import settings
from utils_r2 import upload_to_r2
from utils_ai import trigger_catvton, get_runpod_status
import uuid
from typing import List, Optional

app = FastAPI(title="Kapda AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)

@app.get("/")
async def root():
    return {"message": "Kapda AI API is running"}

# GARMENTS
@app.post("/garments")
async def create_garment(
    name: str = Form(...),
    category: str = Form(...),
    retailer_id: str = Form(...),
    price: Optional[float] = Form(None),
    file: UploadFile = File(...)
):
    content = await file.read()
    file_ext = file.filename.split(".")[-1]
    file_name = f"garments/{uuid.uuid4()}.{file_ext}"
    
    url = upload_to_r2(content, file_name, file.content_type)
    if not url:
        raise HTTPException(status_code=500, detail="Failed to upload image")
    
    data = {
        "name": name,
        "category": category,
        "retailer_id": retailer_id,
        "price": price,
        "image_url": url
    }
    
    result = supabase.table("garments").insert(data).execute()
    return result.data

@app.get("/garments")
async def list_garments(retailer_id: str):
    result = supabase.table("garments").select("*").eq("retailer_id", retailer_id).execute()
    return result.data

# CUSTOMERS
@app.post("/customers")
async def add_customer(
    name: str = Form(...),
    phone: str = Form(...),
    retailer_id: str = Form(...),
    file: UploadFile = File(None)
):
    url = None
    if file:
        content = await file.read()
        file_ext = file.filename.split(".")[-1]
        file_name = f"customers/{uuid.uuid4()}.{file_ext}"
        url = upload_to_r2(content, file_name, file.content_type)
    
    data = {
        "name": name,
        "phone": phone,
        "retailer_id": retailer_id,
        "photo_url": url
    }
    result = supabase.table("customers").insert(data).execute()
    return result.data

# TRYON
@app.post("/tryon")
async def run_tryon(
    retailer_id: str,
    garment_id: str,
    person_image_url: str,
    customer_id: Optional[str] = None
):
    # 1. Get garment details
    garment = supabase.table("garments").select("image_url").eq("id", garment_id).single().execute()
    if not garment.data:
        raise HTTPException(status_code=404, detail="Garment not found")
    
    garment_url = garment.data['image_url']
    
    # 2. Trigger AI
    job = await trigger_catvton(person_image_url, garment_url)
    
    # 3. Create Session
    session_data = {"retailer_id": retailer_id, "customer_id": customer_id}
    session = supabase.table("tryon_sessions").insert(session_data).execute()
    
    return {"job_id": job.get("id"), "session_id": session.data[0]['id']}

@app.get("/tryon/status/{job_id}")
async def check_status(job_id: str, session_id: str, garment_id: str):
    status = await get_runpod_status(job_id)
    
    if status.get("status") == "COMPLETED":
        result_url = status['output'] # Adjust based on actual RunPod output structure
        # Save result
        res_data = {
            "session_id": session_id,
            "garment_id": garment_id,
            "result_url": result_url
        }
        supabase.table("tryon_results").insert(res_data).execute()
        
        # Update usage log
        # (Logic to increment tryon_count in usage_logs)
        
    return status

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
