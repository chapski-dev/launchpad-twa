import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  FC,
  useCallback,
  InputHTMLAttributes,
} from 'react'
import * as S from './style'

//TODO: props refactoring

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  disabled?: boolean
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  error?: boolean
  placeholder?: string
  name?: string
  type?: HTMLInputTypeAttribute
  max?: number
  min?: number
}

export const Input: FC<InputProps> = (props) => {
  const {
    className,
    disabled,
    onChange,
    value,
    error,
    placeholder,
    name,
    max,
    min,
    type,
    ...otherInputProps
  } = props

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (max && Number(evt.target.value) > max) {
      evt.target.value = max.toString()

      return
    }

    if (type === 'number' && min && isNaN(Number(evt.target.value))) {
      evt.target.value = min.toString()
    }

    onChange?.(evt)
  }

  return (
    <S.Input
      className={className}
      disabled={disabled}
      error={error}
      max={max}
      min={min}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
      {...otherInputProps}
    />
  )
}
