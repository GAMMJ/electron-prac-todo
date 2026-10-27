import { useState } from 'react'

type TodoFormProps = {
  onAddTodo: (text: string) => Promise<boolean>
  disabled: boolean
}

export default function TodoForm({ onAddTodo, disabled }: TodoFormProps): React.JSX.Element {
  const [input, setInput] = useState('')

  const handleSubmit = async (): Promise<void> => {
    if (disabled) return

    const text = input.trim()
    if (!text) return

    const saved = await onAddTodo(text)

    if (saved) {
      setInput('')
    }
  }

  return (
    <div className="todo-form">
      <input
        value={input}
        disabled={disabled}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            void handleSubmit()
          }
        }}
        placeholder="할 일을 입력하세요"
      />

      <button disabled={disabled} onClick={() => void handleSubmit()}>
        {disabled ? '저장 중...' : '추가'}
      </button>
    </div>
  )
}
