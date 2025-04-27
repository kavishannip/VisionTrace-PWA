import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFiles = formData.getAll("images");

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "No image files provided" },
        { status: 400 }
      );
    }

    // Initialize Google Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY_IMAGE);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const ocr_results = [];

    for (const imageFile of imageFiles) {
      // Convert File object to base64
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64Image = buffer.toString("base64");

      // Create the prompt with image and instruction
      const prompt = `Please extract all text from this image. Format the output as follows:
      1. Maintain the original layout as much as possible
      2. Preserve paragraph breaks
      3. If there are tables, format them properly
      4. Ignore watermarks or background elements
      5. For any text you're uncertain about, indicate with [?]
      
      Only return the extracted text, no additional comments.If there is no text, reply with None!`;

      const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: imageFile.type,
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      ocr_results.push({
        filename: imageFile.name,
        text: text,
      });
    }

    return NextResponse.json({ results: ocr_results });
  } catch (error) {
    console.error("OCR error:", error);
    return NextResponse.json(
      { error: "Failed to process image", details: error.message },
      { status: 500 }
    );
  }
}
