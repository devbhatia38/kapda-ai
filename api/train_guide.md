# Guide: Training/Fine-Tuning Kapda AI for Indian Traditional Wear

Generic AI models like CatVTON work well for standard clothing but often struggle with the complex drapes of a **Saree** or **Lehenga**. To reach "Pro" level, you should fine-tune your own model.

## 1. Data Preparation (The Most Important Step)
To train a model that understands Indian wear, you need a high-quality dataset.
- **Quantity:** Minimum 500-1000 pairs.
- **Content:** Each pair must have:
  1. **Garment Image:** High-res photo of the saree/lehenga on a flat background or mannequin.
  2. **Person Image:** The same garment being worn by a person in a professional studio setting.
- **Labels:** Use "Saree", "Lehenga", "Anarkali" as tags.

## 2. Training Strategy: LoRA (Low-Rank Adaptation)
Instead of training a whole model, we train a "LoRA" (a small add-on file) for the Stable Diffusion UNet.
- **Base Model:** Use `SDXL` or `Realistic Vision V6.0`.
- **Training Tool:** Use `Kohya_ss` or `AutoTrain` on Hugging Face.

## 3. Implementation Workflow
1. **Background Removal:** Use `Rembg` to remove backgrounds from your garment catalog.
2. **Keypoint Detection:** Use `OpenPose` to detect the person's body pose.
3. **Warping:** Use `IDM-VTON` or `CatVTON` as the architecture.

## 4. How to Host your "Pro" Model
Once trained, deploy your model to **RunPod** as a Serverless Endpoint.
- This ensures you only pay when someone uses the app.
- It provides 24GB VRAM (A100 or 3090) for fast inference (<5 seconds).

## 5. Next Steps for Kapda AI
- [ ] Collect 500 images of Saree models.
- [ ] Use `scripts/prepare_data.py` (to be built) to crop and resize images to 768x1024.
- [ ] Start a training job on Hugging Face AutoTrain.
