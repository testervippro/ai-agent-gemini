import { reddit } from './tools/reddit'
import { dadJoke } from './tools/dadJoke'
import { FunctionCall } from '@google/genai'
import { generateImage } from './tools/generateImage'
import { runTest } from './tools/playwright'

export const runTool = async (toolCall: FunctionCall, userMessage: string) => {
  const input = {
    userMessage,
    toolArgs: toolCall.args!,
  }

  switch (toolCall.name) {
    case 'generate_image':
      const image = await generateImage(input)
      return image
    case 'dad_joke':
      return dadJoke(input)
    case 'reddit':
      return reddit(input)
    case 'run_playwright_test':
      return runTest(input)
    default:
      throw new Error(`Unknown tool: ${toolCall.name}`)
  }
}
