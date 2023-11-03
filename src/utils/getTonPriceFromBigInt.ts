import { toHumanNumber } from './toHumanNumber'

export const getTonPriceFromBigInt = (amount: bigint, price: number) => {
  return Number(toHumanNumber(amount)) / price
}
