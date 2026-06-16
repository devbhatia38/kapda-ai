from gradio_client import Client, handle_file
import asyncio
from config import settings

async def trigger_catvton(person_image_url: str, garment_image_url: str):
    """
    Triggers CatVTON using the free Hugging Face Gradio API.
    Note: This is an async wrapper for the Gradio Client.
    """
    def _run():
        client = Client("x0711/CatVTON")
        result = client.predict(
            person_img=handle_file(person_image_url),
            cloth_img=handle_file(garment_image_url),
            cloth_type="Upper body",
            num_inference_steps=20,
            guidance_scale=3.5,
            seed=42,
            show_type="result only",
            api_name="/submit"
        )
        return result

    # Run the blocking Gradio call in a thread pool
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, _run)
    
    # Result from CatVTON Gradio usually returns a tuple (image_path, mask_path)
    # or just the image path depending on 'show_type'
    return result[0] if isinstance(result, tuple) else result
