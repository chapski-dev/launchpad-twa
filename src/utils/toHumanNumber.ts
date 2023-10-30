export const toHumanNumber = (bigint: BigInt): string => {
  return (Number(bigint) / 1e9).toFixed(2)
}
