import { contextBridge, ipcRenderer } from 'electron'

type Todo = {
  id: number
  text: string
  completed: boolean
}

const todoAPI = {
  loadTodos: (): Promise<Todo[]> => {
    return ipcRenderer.invoke('load-todos')
  },

  saveTodos: (todos: Todo[]): Promise<boolean> => {
    return ipcRenderer.invoke('save-todos', todos)
  }
}

contextBridge.exposeInMainWorld('todoAPI', todoAPI)
