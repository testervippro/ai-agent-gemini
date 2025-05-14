import { reddit } from './tools/reddit'
import { dadJoke } from './tools/dadJoke'
import { FunctionCall } from '@google/genai'

export const runTool = async (toolCall: FunctionCall, userMessage: string) => {
  switch (toolCall.name) {
    case 'dad_joke':
      return dadJoke()
    case 'reddit':
      return reddit({
        toolArgs: toolCall.args,
        userMessage,
      })
    default:
      throw new Error(`Unknown tool: ${toolCall.name}`)
  }
}
