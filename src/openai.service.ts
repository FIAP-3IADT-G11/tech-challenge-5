import { BadRequestException, Injectable } from "@nestjs/common";
import { OpenAI } from "openai";

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeImage(imageBuffer: Buffer, mimeType = "image/jpeg") {
    const base64Image = imageBuffer.toString("base64");

    const prompt = `
        Você é um assistente de segurança da informação especializado em análise de vulnerabilidades de arquitetura de sistemas de software, identificando os componentes da arquitetura.
        Analise o diagrama de arquitetura de sistemas de software fornecido através de uma imagem e identifique possíveis vulnerabilidades de cada componente utilizando o modelo STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).
        Para cada componente identificado, explique:
        - As ameaças identificadas
        - Qual categoria STRIDE elas representam
        - Por que elas são ameaças
        - Sugestões de mitigação

        Obrigatoriamente cada componente deve ser analisado, mesmo que não seja possível identificar ameaças. Caso não seja possível identificar ameaças.

        Apresente sua resposta de forma estruturada, separando por componente, e se a ameaça é possível de ocorrer.

        Estruture o texto para que o mesmo possa se tornar um relatório de segurança que possa ser enviado para o cliente em formato PDF.

        Diagrama para análise: [imagem anexada]

        O relatório deve ser em português brasileiro.
    `;

    const response = await this.openai.chat.completions.create({
      model: "ft:gpt-4o-2024-08-06:personal::Bpx5IMVx",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    const result = response.choices[0].message?.content;

    if (
      result?.includes(
        "Imagem não é um diagrama de arquitetura de sistemas de software"
      )
    ) {
      throw new BadRequestException(
        "Imagem não é um diagrama de arquitetura de sistemas de software"
      );
    }

    return result;
  }
}
