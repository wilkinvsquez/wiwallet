import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class TransactionParserService {
	private genAI: GoogleGenerativeAI;
	private model: any;

	constructor() {
		// Asegúrate de tener GEMINI_API_KEY en tus variables de entorno (.env)
		this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
		this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
	}

	async parseTransaction(text: string) {
		const prompt = `
      Analiza el siguiente texto de una transacción financiera y extrae los datos en JSON:
      Texto: "${text}"
      
      Formato JSON esperado:
      {
        "amount": number,
        "currency": "CRC" | "USD",
        "category": string (ej: "Comida", "Transporte", "Servicios"),
        "merchant": string,
        "date": "YYYY-MM-DD" (si no se especifica, usa la fecha de hoy)
      }
      Solo devuelve el JSON, sin markdown.
    `;

		const result = await this.model.generateContent(prompt);
		const response = await result.response;
		const textResponse = response.text();

		try {
			// Limpiar posibles bloques de código markdown
			const jsonString = textResponse
				.replace(/```json/g, "")
				.replace(/```/g, "")
				.trim();
			return JSON.parse(jsonString);
		} catch (error) {
			console.error("Error parsing AI response:", error);
			return null;
		}
	}
}
