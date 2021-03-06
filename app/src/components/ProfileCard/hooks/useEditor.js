import usePost from '../../../hooks/usePost'
import useForm from '../../../hooks/useForm'
import useEditing from './useEditing'
import { useMemo, useCallback, useEffect } from 'react'
import { useStateContext } from '../../../context/State'
import { updateProfile } from '../../../context/actions'

export default function useEditor(defaultValue) {
  const {
    state: {
      userProfile: { loading, error, ...rest }
    },
    dispatch
  } = useStateContext()

  const { post, loading: postLoading, error: postError } = usePost()
  const handlers = useForm(8)
  const editableFields = useEditing(7)
  const [name, city, country, career, dateOfBirth, phone, paymentMethod, installments] = handlers

  const data = useMemo(() => {
    if (!defaultValue) return rest.data
    return defaultValue
  })

  useEffect(() => {
    if (loading || error) return
    name.onChange({ target: { value: data.name } })
    city.onChange({ target: { value: data.city } })
    country.onChange({ target: { value: data.country } })
    career.onChange({ target: { value: data.career } })
    dateOfBirth.onChange({ target: { value: data.dateOfBirth.substr(0, 10) } })
    phone.onChange({ target: { value: data.phone } })
    paymentMethod.onChange({ target: { value: data.paymentMethod } })
    installments.onChange({ target: { value: data.installments } })
  }, [data])

  const unsavedChanges = useMemo(() => {
    if (loading || error || !name.value) return false
    return (
      data.name !== name.value ||
      data.city !== city.value ||
      data.country !== country.value ||
      data.career !== career.value ||
      data.dateOfBirth.substr(0, 10) !== dateOfBirth.value ||
      data.phone !== phone.value ||
      data.paymentMethod !== paymentMethod.value ||
      data.installments !== installments.value
    )
  }, [data, handlers])

  const saveChanges = useCallback(() => {
    if (!unsavedChanges) return
    return post('/api/user/profile/update', {
      name: name.value,
      career: career.value,
      dateOfBirth: dateOfBirth.value,
      phone: phone.value,
      country: country.value,
      city: city.value,
      paymentMethod: paymentMethod.value,
      installments: installments.value
    }).then(res => {
      if (res.status >= 400) return res
      updateProfile(dispatch, res.data)
      finishEditing()
    })
  }, [handlers])

  function finishEditing() {
    editableFields.forEach(field => {
      field.setEditing(false)
    })
  }

  useEffect(() => {
    function handleOnKeyUp({ key, ...a }) {
      if (key !== 'Escape') return
      finishEditing()
    }
    window.addEventListener('keyup', handleOnKeyUp)
    return () => {
      window.removeEventListener('keyup', handleOnKeyUp)
    }
  }, [])

  return {
    profile: { data, loading, error },
    updater: { loading: postLoading, error: postError },
    handlers: { name, city, country, career, dateOfBirth, phone, paymentMethod, installments },
    editableFields: {
      name: editableFields[0],
      location: editableFields[1],
      career: editableFields[2],
      dateOfBirth: editableFields[3],
      phone: editableFields[4],
      paymentMethod: editableFields[5],
      installments: editableFields[6]
    },
    saveChanges,
    unsavedChanges
  }
}
