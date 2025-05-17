import { Content, FunctionDeclaration } from '@google/genai'
import { gemini_ai } from './ai'
import { systemPrompt } from './systemPrompt'

export const runLLM = async ({
  model = 'gemini-2.0-flash',
  temperature = 0.1,
  contents,
  tools,
}: {
  model?: string
  temperature?: number
  contents: Content[]
  tools: FunctionDeclaration[]
}) => {
  const response = await gemini_ai.models.generateContent({
    model,
    contents,
    config: {
      temperature,
      systemInstruction: systemPrompt,
      tools: [
        {
          functionDeclarations: tools,
        },
      ],
    },
  })

  return response
}
