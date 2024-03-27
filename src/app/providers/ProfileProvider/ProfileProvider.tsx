import { createContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { getXapiProfile, createUser, connectWallet } from 'api'
import { GetXapiProfileResp } from 'api/types'
import { Chains } from 'constants/blockchain'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { FCWithChildren } from 'types/app'
import { getBalance } from 'utils/getBalance'

export type ProfileContextType = {
  profileInfo?: any
  balance?: number
  invitedBy?: {
    username: string
  } | null
  refetchProfileBalance?: () => void
  xapiProfileInfo?: GetXapiProfileResp
  setXapiProfileFlag: (flag: 'pending-kyc' | 'new' | 'done' | 'done2') => void
}

export const ProfileContext = createContext<ProfileContextType>({
  setXapiProfileFlag: () => null,
})

export const ProfileProvider: FCWithChildren = (props) => {
  const { children } = props

  const [tonConnectUI] = useTonConnectUI()

  const userWalletAddress = useTonAddress()

  const { webApp, user } = useTelegram()

  const { data: balance, refetch: refetchProfileBalance } = useQuery({
    queryKey: ['userBalance'],
    queryFn: () => getBalance(userWalletAddress, 'testnet'),
    enabled: !!userWalletAddress,
  })

  const [flag, setFlag] = useState<'pending-kyc' | 'new' | 'done' | 'done2'>(
    'new'
  )

  const { data: xapiProfileInfo } = useQuery({
    queryKey: ['xapiProfile', flag],
    queryFn: () => getXapiProfile({ flag: flag }),
    enabled: Boolean(user?.username),
  })

  // const { data: userData, mutate: createUserI } = useMutation({
  //   mutationKey: ['createUser'],
  //   mutationFn: () => createUser(),
  // })

  // const { data: savedProfileData, mutate: saveProfileInfo } = useMutation({
  //   mutationKey: ['saveProfile'],
  //   mutationFn: (profileData: ProfileInfoType) => saveProfile(profileData),
  // })

  const { data: userData } = useQuery({
    queryKey: ['createUser'],
    queryFn: () => createUser(),
    enabled: Boolean(user?.id),
  })

  const { mutate: connectWalletI } = useMutation({
    mutationKey: ['connectWallet'],
    mutationFn: (x: { n: string; a: string }) => connectWallet(x.n, x.a),
  })

  useEffect(() => {
    if (webApp && userData) {
      webApp.CloudStorage.setItem('isAlreadyAuthorized', 'true')
    }
  }, [userData, webApp])

  // useEffect(() => {
  //   if (webApp && user) {
  //     // const initData = new URLSearchParams(webApp.initData)
  //     // const referrer_id = initData.get('start_param')

  //     if (!userData) {
  //       createUserI()

  //       return
  //     }
  //   }
  // }, [userData, createUser, user, webApp])

  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      if (wallet !== null) {
        if (Chains[wallet.account.chain] === 'mainnet') {
          alert('Please, connect testnet wallet')

          tonConnectUI.disconnect()

          return
        }
        connectWalletI({
          a: wallet.account.address,
          n: 'TON',
        })
      }
    })
  }, [connectWalletI, tonConnectUI])

  const value = {
    balance,
    xapiProfileInfo,
    refetchProfileBalance,
    setXapiProfileFlag: setFlag,
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
