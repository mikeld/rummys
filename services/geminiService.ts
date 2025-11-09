import { GoogleGenAI, Type } from "@google/genai";
import { TrivialQuestion } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        preguntas: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    pregunta: { type: Type.STRING },
                    opciones: { type: Type.ARRAY, items: { type: Type.STRING } },
                    respuestaCorrecta: { type: Type.STRING },
                    explicacion: { type: Type.STRING }
                },
                required: ["pregunta", "opciones", "respuestaCorrecta", "explicacion"]
            }
        }
    },
    required: ["preguntas"]
};


export const generateTrivialQuestions = async (): Promise<TrivialQuestion[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Genera 10 preguntas de tipo trivial sobre la historia, cultura, monumentos y curiosidades de la ciudad de Pamplona, España. Las preguntas deben ser desafiantes pero no extremadamente difíciles. Cada pregunta debe tener 3 opciones y una explicación breve y entretenida de la respuesta correcta.",
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8 // Aumenta la creatividad para preguntas variadas
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        if (parsedJson.preguntas && Array.isArray(parsedJson.preguntas)) {
            return parsedJson.preguntas;
        } else {
            throw new Error("La respuesta de la IA no tiene el formato esperado.");
        }
    } catch (error) {
        console.error("Error al generar preguntas del trivial:", error);
        throw new Error("No se pudieron generar las preguntas. Inténtalo de nuevo más tarde.");
    }
};
