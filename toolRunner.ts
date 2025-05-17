import { reddit } from './tools/reddit'
import { dadJoke } from './tools/dadJoke'
import { FunctionCall } from '@google/genai'

export const runTool = async (toolCall: FunctionCall, userMessage: string) => {
  const input = {
    userMessage,
    toolArgs: toolCall.args,
  }

  switch (toolCall.name) {
    case 'dad_joke':
      return dadJoke(input)
    case 'reddit':
      return reddit(input)
    default:
      throw new Error(`Unknown tool: ${toolCall.name}`)
  }
}
