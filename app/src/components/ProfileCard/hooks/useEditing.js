import { useState } from 'react'

export default function useEditing(number) {
  const [states, setStates] = useState(
    Array.from(Array(number), (_, index) => {
      function setEditing(value) {
        setStates(states => {
          const newValue = [...states]
          newValue[index] = { ...newValue[index], editing: value }
          return newValue
        })
      }
      return { editing: false, setEditing }
    })
  )

  return states
}
