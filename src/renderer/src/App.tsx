import React, { useEffect, useRef, useState } from 'react'
import TodoForm from './features/todos/components/TodoForm'
import './assets/main.css'

type Todo = {
  id: number
  text: string
  completed: boolean
}

const createTodoId = (): number => Date.now()

export default function App(): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const isSavingRef = useRef(false)

  useEffect(() => {
    const loadTodos = async (): Promise<void> => {
      try {
        const savedTodos = await window.todoAPI.loadTodos()
        setTodos(savedTodos)
      } catch (error) {
        console.error('할 일 목록을 불러오지 못했습니다.', error)
      }
    }

    void loadTodos()
  }, [])

  const persistTodos = async (nextTodos: Todo[]): Promise<boolean> => {
    if (isSavingRef.current) return false

    isSavingRef.current = true
    setIsSaving(true)

    try {
      await window.todoAPI.saveTodos(nextTodos)

      setTodos(nextTodos)
      setErrorMessage('')
      return true
    } catch (error) {
      console.error('할 일 저장 실패:', error)
      setErrorMessage('할 일 저장에 실패했습니다.')
      return false
    } finally {
      isSavingRef.current = false
      setIsSaving(false)
    }
  }

  const addTodo = async (text: string): Promise<boolean> => {
    const newTodo: Todo = {
      id: createTodoId(),
      text,
      completed: false
    }

    const nextTodos = [...todos, newTodo]

    return await persistTodos(nextTodos)
  }

  const toggleTodo = async (id: number): Promise<void> => {
    const nextTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )

    await persistTodos(nextTodos)
  }

  const deleteTodo = async (id: number): Promise<void> => {
    const nextTodos = todos.filter((todo) => todo.id !== id)

    await persistTodos(nextTodos)
  }

  return (
    <main className="todo-app">
      <h1>My Todo</h1>
      {errorMessage && <p role="alert">{errorMessage}</p>}
      <TodoForm onAddTodo={addTodo} disabled={isSaving} />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                disabled={isSaving}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            </label>

            <button disabled={isSaving} onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
