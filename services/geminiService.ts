
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

export const getJimmyAdvice = async (topic: string, lang: Language): Promise<string> => {
  // Fix: Use the standard initialization pattern and move it inside the function 
  // to ensure it uses the latest API key if it's updated dynamically.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const langPrompts = {
    ar: "باللهجة المصرية أو العربية المبسطة وبأسلوب عصري",
    en: "in friendly, modern English",
    fr: "en français amical et moderne",
    de: "in freundlichem, modernem Deutsch"
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are "Jimmy", a cool eco-expert mentor. Explain briefly ${langPrompts[lang]}: ${topic}. Focus on recycling symbols or sustainability. Max 50 words. Respond ONLY in the requested language.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    // The response.text property directly returns the string output.
    return response.text || "I'm here to help!";
  } catch (error) {
    console.error("Error getting Jimmy's advice:", error);
    return "Looks like I need some solar power.. try again later!";
  }
};
