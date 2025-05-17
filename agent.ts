import { FunctionDeclaration } from '@google/genai'
import { addMessages, getMessages } from './memory'
import { logMessage, showLoader } from './ui'
import { runLLM } from './llm'
import { runTool } from './toolRunner'

export const runAgent = async ({
  turns = 10,
  userMessage,
  tools = [],
}: {
  turns?: number
  userMessage: string
  tools?: FunctionDeclaration[]
}) => {
  logMessage({
    role: 'user',
    parts: [{ text: userMessage }],
  })

  await addMessages([
    {
      role: 'user',
      parts: [{ text: userMessage }],
    },
  ])

  const loader = showLoader('Thinking...')

  while (true) {
    const contents = await getMessages()

    const response = await runLLM({
      contents,
      tools,
    })

    if (!response) {
      throw new Error('No Response Present')
    }

    let content = response.candidates?.[0]?.content

    if (!content) {
      throw new Error('No Content')
    }

    await addMessages([content])

    logMessage(content)

    // using response.text directly generate a warning as this contains functionCalls in content parts
    if (!response.functionCalls && response.text) {
      loader.stop()
      return getMessages()
    }

    // if response is a function call
    if (response.functionCalls && response.functionCalls.length > 0) {
      const tool_call = response.functionCalls[0]

      loader.update(`executing: ${tool_call.name}`)

      const toolResponse = await runTool(tool_call, userMessage)

      // adding the tool response to context
      await addMessages([
        {
          role: 'user',
          parts: [
            {
              functionResponse: {
                name: tool_call.name,
                response: { json: JSON.stringify(toolResponse) },
              },
            },
          ],
        },
      ])

      loader.update(`executed: ${tool_call.name}`)
    }
  }
}
