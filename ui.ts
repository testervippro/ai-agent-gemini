import ora from 'ora'
import colors from 'colors'
import { AIMessage } from './types'

export const showLoader = (text: string) => {
  const spinner = ora({
    text,
    color: 'cyan',
  }).start()

  return {
    stop: () => spinner.stop(),
    succeed: (text?: string) => spinner.succeed(text),
    fail: (text?: string) => spinner.fail(text),
    update: (text: string) => (spinner.text = text),
  }
}

export const logMessage = (message: AIMessage) => {
  const roleColors = {
    user: 'cyan', // cyan
    assistant: 'green', // green
  }

  const role = message.role

  // Log user messages (only have content)
  if (role === 'user') {
    console.log(colors.cyan(`\n[USER]`))
    console.log(`${message.parts![0].text}\n`)
    return
  }

  // Log assistant messages
  if (role === 'model') {
    // If has tool_calls, log function name
    if (message.parts && message.parts[0].functionCall) {
      console.log(colors.green(`\n[ASSISTANT]`))
      console.log(`${message.parts[0].functionCall.name}\n`)
      return
    }

    // If has content, log it
    if (message.parts && message.parts[0].text) {
      console.log(colors.green(`\n[ASSISTANT]`))
      console.log(`${message.parts[0].text}\n`)
    }
  }
}
