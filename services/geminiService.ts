import { GoogleGenAI, Type } from "@google/genai";
import { BadgeData } from "../types";

export const getBadgeDesignIdeas = async (data: BadgeData) => {
  // Инициализируем внутри функции, чтобы гарантировать наличие process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const prompt = `I am organizing a Model United Nations (MUN) event called "${data.eventTitle}". 
  I need creative design ideas for participant badges using a Blue and Yellow color scheme.
  The participant is a ${data.role} representing ${data.country} in the ${data.committee}.
  Provide 3 distinct design concepts. Focus on how to use blue (professionalism) and yellow (energy/highlight) effectively.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING },
          concepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                elements: { type: Type.ARRAY, items: { type: Type.STRING } },
                colorUsage: { type: Type.STRING }
              },
              required: ["title", "elements", "colorUsage"]
            }
          }
        },
        required: ["description", "concepts"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateVisualReference = async (ideaTitle: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `A professional Model United Nations badge design mockup. Blue and gold-yellow color scheme. Concept: ${ideaTitle}. High quality, graphic design, clean lines, professional photography.` },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed", error);
    return null;
  }
};