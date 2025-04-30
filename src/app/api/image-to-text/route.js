import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper function to sleep with jitter
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry with exponential backoff and jitter
async function retryWithBackoff(fn, maxRetries = 3, baseDelayMs = 1000) {
  let retries = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      if (retries > maxRetries || !isRetryableError(error)) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const exponentialDelay = baseDelayMs * Math.pow(2, retries);
      const jitter = Math.random() * 0.3 * exponentialDelay; // 0-30% jitter
      const delay = exponentialDelay + jitter;

      console.log(
        `Retrying request after ${Math.round(
          delay
        )}ms (attempt ${retries} of ${maxRetries})...`
      );
      await sleep(delay);
    }
  }
}

// Determine if error is retryable (rate limits, temporary server issues)
function isRetryableError(error) {
  // Check for rate limit errors, server overload, or network issues
  if (
    error.message?.includes("429") ||
    error.message?.includes("rate limit") ||
    error.message?.includes("timeout") ||
    error.message?.includes("network") ||
    error.message?.includes("server error") ||
    error.message?.includes("503")
  ) {
    return true;
  }
  return false;
}

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

      // Use the retry function to handle the API call
      const generatedPrompt = await retryWithBackoff(async () => {
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        return response.text();
      });

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
