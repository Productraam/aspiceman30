import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are an expert Automotive SPICE (ASPICE) Assessor and Senior Project Manager. 
Your goal is to help a user achieve Level 3 (Established) capability in the MAN.3 (Project Management) process.
Always emphasize:
1. The importance of the Standard Process.
2. Tailoring (adapting the standard to the project).
3. Evidence (Work Products).
4. Traceability.

Keep answers concise, professional yet encouraging. If asked for templates, provide structure examples.
`;

export const generateASPICEAdvice = async (prompt: string, context?: string): Promise<string> => {
  try {
    const fullPrompt = context ? `Context: ${context}\n\nUser Query: ${prompt}` : prompt;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI Assessor. Please check your API key or connection.";
  }
};