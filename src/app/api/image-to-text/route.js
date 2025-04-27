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
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY_OCR);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const results = [];

    for (const imageFile of imageFiles) {
      // Convert File object to base64
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64Image = buffer.toString("base64");

      // Create the prompt to analyze the image and generate a prompt for similar image creation
      const prompt = `Analyze this image in detail and generate a comprehensive prompt that could be used 
      to create a very similar image using an AI image generator. The prompt should include:
      1. Subject matter description
      2. Style, artistic medium or technique
      3. Composition details
      4. Lighting, color palette, and mood
      5. Any distinctive features or elements
      6. Perspective and camera angle if applicable
      
      Format the output as a single, detailed prompt that captures the essence of this image. As output, give me only the prompt.`;

      const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: imageFile.type,
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const generatedPrompt = response.text();

      results.push({
        filename: imageFile.name,
        generatedPrompt: generatedPrompt,
      });
    }

    return NextResponse.json({ results: results });
  } catch (error) {
    console.error("Image analysis error:", error);
    return NextResponse.json(
      { error: "Failed to process image", details: error.message },
      { status: 500 }
    );
  }
}
