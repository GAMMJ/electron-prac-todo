type Todo = {
  id: number
  text: string
  completed: boolean
}

interface Window {
  todoAPI: {
    loadTodos: () => Promise<Todo[]>
    saveTodos: (todos: Todo[]) => Promise<boolean>
  }
}
