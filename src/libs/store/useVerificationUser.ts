import { create } from 'zustand'

export interface State {
  verified: boolean;
}

export type Actions = {
  setVerified: (qty: boolean) => void
}

export const useVerificationUserStore = create<State & Actions>((set) => ({
  verified: false,
  setVerified: (qty: boolean) => set(() => ({ 'verified': qty })),
}));