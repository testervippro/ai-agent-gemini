import { Content, FunctionDeclaration } from '@google/genai'
import { gemini_ai } from './ai'
import { systemPrompt } from './systemPrompt'

export const runLLM = async ({
  model = 'gemini-2.0-flash',
  temperature = 0.1,
  history = undefined,
  message,
  tools,
}: {
  model?: string
  temperature?: number
  message: string
  history?: Content[]
  tools: FunctionDeclaration[]
}) => {
  const chat = gemini_ai.chats.create({
    model,
    history,
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

  const response = await chat.sendMessage({
    message,
  })

  return response.candidates![0].content
}
