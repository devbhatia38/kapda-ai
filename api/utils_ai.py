from gradio_client import Client, handle_file
import asyncio
from config import settings

async def trigger_catvton(person_image_url: str, garment_image_url: str, hf_token: str = None):
    """
    Triggers CatVTON using Hugging Face Gradio API.
    Fallback logic: Use provided hf_token, or global settings, or no token (free public).
    """
    token = hf_token or settings.RUNPOD_API_KEY # Reusing RUNPOD_API_KEY env for HF token if present

    def _run():
        # If token is provided, use it for authenticated (faster/higher limit) access
        client = Client("x0711/CatVTON", hf_token=token)
        result = client.predict(
            person_img=handle_file(person_image_url),
            cloth_img=handle_file(garment_image_url),
            cloth_type="Overall", # Better for Indian Traditional wear (Sarees/Lehengas)
            num_inference_steps=40, # Higher steps = better correctness/quality
            guidance_scale=3.5,
            seed=42,
            show_type="result only",
            api_name="/submit"
        )
        return result

    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, _run)
    return result[0] if isinstance(result, tuple) else result
