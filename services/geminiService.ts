
import { GoogleGenAI } from '@google/genai';
import type { ReplyStyle } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (message: string, style: ReplyStyle): string => {
  return `
You are an AI reply assistant. Your task is to generate a natural, smart, and context-aware response to an incoming message based on a specified style.

**LANGUAGE RULES:**
- Detect the language of the incoming message (English, Arabic Darija, or French).
- Reply in the EXACT same language.
- If the message mixes languages (e.g., Darija + French), respond in a balanced, natural mix.
- Your reply must sound human-like and not robotic.

**STYLE:**
- Style Code: ${style.code}
- Style Name: ${style.name}
- Description: ${style.description}
- Your response must strictly adhere to this style.

**OUTPUT RULES:**
- Your entire response should ONLY be the message text, ready to be sent.
- DO NOT include any explanations, prefixes like "Reply:", or quotation marks unless they are part of the message itself.
- Keep the message length natural for a text conversation (usually 1-3 sentences).

**INCOMING MESSAGE:**
"${message}"

**YOUR GENERATED REPLY:**
`;
};

export const generateReply = async (message: string, style: ReplyStyle): Promise<string> => {
  try {
    const prompt = buildPrompt(message, style);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text.trim();
    if (!text) {
      throw new Error("Received an empty response from the API.");
    }
    
    return text;
  } catch (error) {
    console.error("Error generating reply with Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
