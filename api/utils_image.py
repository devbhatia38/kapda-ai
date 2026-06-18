from PIL import Image, ImageOps
import io
import requests

def preprocess_image(image_url: str, target_size=(768, 1024)):
    """
    Downloads an image, resizes and pads it to maintain aspect ratio (3:4),
    handling transparency by converting to RGB with a white background.
    """
    try:
        response = requests.get(image_url, timeout=10)
        img = Image.open(io.BytesIO(response.content))
        
        # Handle transparency
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
            background = Image.new("RGBA", img.size, (255, 255, 255, 255))
            img = Image.alpha_composite(background, img).convert("RGB")
        else:
            img = img.convert("RGB")
        
        # Calculate aspect ratio and resize
        img.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        # Create a new image with background color (white) and paste the resized image
        new_img = Image.new("RGB", target_size, (255, 255, 255))
        paste_pos = ((target_size[0] - img.size[0]) // 2, (target_size[1] - img.size[1]) // 2)
        new_img.paste(img, paste_pos)
        
        # Save to bytes
        img_byte_arr = io.BytesIO()
        new_img.save(img_byte_arr, format='JPEG', quality=95, subsampling=0)
        return img_byte_arr.getvalue()
    except Exception as e:
        print(f"Preprocessing error for {image_url}: {e}")
        return None

def enhance_result(image_path: str):
    """
    Simple post-processing to sharpen the AI output.
    """
    try:
        img = Image.open(image_path)
        # Add sharpening or contrast enhancement here if needed
        return img
    except:
        return None
