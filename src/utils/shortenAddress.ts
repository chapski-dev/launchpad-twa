export const shortenAddress = (value: string) => {
  return value.length > 20
    ? `${value.slice(0, 5)} • • • ${value.slice(value.length - 5)}`
    : value
}
