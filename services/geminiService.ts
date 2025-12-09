import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Fallback to empty if not set, handled in UI

export const generateArticleContent = async (title: string, summary: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please configure the environment variable.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      You are a thoughtful, introspective blog author.
      Write a full blog post in Markdown format based on this title: "${title}" 
      and this summary context: "${summary}".
      
      The tone should be personal, slightly poetic, and reflective (similar to a sophisticated personal diary).
      Use Chinese as the primary language.
      Include proper headings, paragraphs, and maybe a concluding thought.
      Do not include the title in the body output, just the content.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate the article at this moment. Please try again later.";
  }
};