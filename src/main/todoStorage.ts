import { app } from 'electron'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'

export const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean()
})

export const TodoArraySchema = z.array(TodoSchema)

export type Todo = z.infer<typeof TodoSchema>

const getTodoFilePath = (): string => path.join(app.getPath('userData'), 'todos.json')

export const loadTodos = async (): Promise<Todo[]> => {
  const filePath = getTodoFilePath()

  try {
    const content = await readFile(filePath, 'utf-8')
    return TodoArraySchema.parse(JSON.parse(content))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }

    throw error
  }
}

export const saveTodos = async (todos: Todo[]): Promise<boolean> => {
  const filePath = getTodoFilePath()

  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8')

  return true
}
