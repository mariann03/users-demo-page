import { useState } from 'react'

export default function useForm(fields) {
  const [inputs, setInputs] = useState(
    Array.from(Array(fields), (_, index) => {
      function onChange(e) {
        const { value } = e.target
        setInputs(inputs => {
          const newValue = [...inputs]
          newValue[index] = { ...inputs[index], value }
          return newValue
        })
      }
      return { value: '', onChange }
    })
  )

  return inputs
}
