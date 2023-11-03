import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
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
  actionElement?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
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
    actionElement,
    ...otherInputProps
  } = props

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (max && Number(evt.target.value) > max) {
      evt.target.value = max.toString()

      return
    }

    if (
      type === 'number' &&
      min &&
      isNaN(Number(evt.target.value)) &&
      evt.target.value !== ''
    ) {
      evt.target.value = min.toString()
    }

    onChange?.(evt)
  }

  return (
    <S.InputWrapper className={className}>
      <S.Input
        ref={ref}
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
      {actionElement}
    </S.InputWrapper>
  )
})
