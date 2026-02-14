import { Injectable } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  GenerateContentResult,
  EnhancedGenerateContentResponse,
} from '@google/generative-ai';

// Definimos la estructura esperada para el retorno
interface TransactionData {
  amount: number;
  currency: 'CRC' | 'USD';
  category: string;
  merchant: string;
  date: string;
}

@Injectable()
export class TransactionParserService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel; // Cambiado de any a GenerativeModel

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Definimos el modelo con el tipo correcto
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async parseTransaction(text: string): Promise<TransactionData | null> {
    const prompt = `
      Analiza el siguiente texto de una transacción financiera y extrae los datos en JSON:
      Texto: "${text}"
      
      Formato JSON esperado:
      {
        "amount": number,
        "currency": "CRC" | "USD",
        "category": string,
        "merchant": string,
        "date": "YYYY-MM-DD"
      }
      Solo devuelve el JSON, sin markdown.
    `;

    try {
      // Tipamos el resultado de la llamada a la IA
      const result: GenerateContentResult =
        await this.model.generateContent(prompt);
      const response: EnhancedGenerateContentResponse = result.response;
      const textResponse: string = response.text();

      // Limpiar bloques de código markdown
      const jsonString: string = textResponse
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      // Casteamos el resultado del parseo a nuestra interfaz
      const parsedData = JSON.parse(jsonString) as TransactionData;

      // Validación mínima post-parseo
      if (!parsedData.amount || !parsedData.currency) {
        throw new Error('Invalid transaction structure from AI');
      }

      return parsedData;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return null;
    }
  }
}
