import { Type, FunctionDeclaration } from '@google/genai'
import { ToolFn } from '../types'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const run_playwright_test: FunctionDeclaration = {
  name: 'run_playwright_test',
  parameters: {
    type: Type.OBJECT,
    properties: {
      testFile: {
        type: Type.STRING,
        description: 'Optional: Specific test file to run',
      }
    },
    description: 'Run Playwright tests from the tests folder. Optionally specify a test file.',
  }
}

type Args = typeof run_playwright_test.parameters

export const runTest: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  try {
    const args = toolArgs as { testFile?: string }
    const command = `npx playwright test${args.testFile ? ` ${args.testFile}` : ''}`
    
    const { stdout, stderr } = await execAsync(command)
    if (stderr) {
      return `Warning: ${stderr}\nOutput: ${stdout}`
    }
    return stdout.trim()
  } catch (error: any) {
    return `Failed to execute Playwright test: ${error.message}`
  }
}
