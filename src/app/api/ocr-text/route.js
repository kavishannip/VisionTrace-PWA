import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper function to sleep with jitter
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*************  ✨ Windsurf Command 🌟  *************/
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

      console.log(
        `Retrying request after ${Math.round(
          delay
        )}ms (attempt ${retries} of ${maxRetries})...`
      );
      await sleep(delay);
    }
  }
}
/*******  12d2d52a-f389-4bdb-84d6-7b2ef8361635  *******/

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

      // Use the retry function to handle the API call
      const text = await retryWithBackoff(async () => {
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        return response.text();
      });

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
