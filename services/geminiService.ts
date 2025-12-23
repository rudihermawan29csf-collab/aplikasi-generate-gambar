import { GoogleGenAI } from "@google/genai";
import { FusionStyle, GenerationConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFusionImage = async (config: GenerationConfig): Promise<string> => {
  try {
    // Construct a specialized prompt that enforces the "Free Fire x Bani Abbasid" aesthetic
    const basePrompt = `
      Create a high-quality, digital art masterpiece fusing the visual style of the mobile game 'Free Fire' (Battle Royale, tactical, neon, high contrast, edgy, modern military) with the historical aesthetics of the 'Bani Abbasid Caliphate' (Islamic Golden Age, intricate geometric patterns, gold, turquoise, ancient Baghdad, desert robes, calligraphy).
      
      Visual elements to combine:
      - Cyber-Islamic aesthetics: Neon arabesque patterns glowing on tactical armor.
      - Environment: ${config.style === FusionStyle.ARCHITECTURE ? 'Futuristic ancient Baghdad with holographic minarets and gold domes' : 'Desert battlefield with sci-fi ruins'}.
      - Lighting: Cinematic, dramatic, 'golden hour' mixed with neon cyan and amber.
      - Quality: 8k resolution, Unreal Engine 5 render, highly detailed, loading screen art style.
      
      Specific Subject: ${config.prompt}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: basePrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio,
        }
      }
    });

    let imageUrl = '';
    
    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break; // Found the image
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image generated found in response.");
    }

    return imageUrl;

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};