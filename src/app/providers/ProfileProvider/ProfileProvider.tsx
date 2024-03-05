import { createContext, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { getProfile, saveProfile } from 'api'
import { ProfileInfoType } from 'api/types'
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
}

export const ProfileContext = createContext<ProfileContextType>({})

export const ProfileProvider: FCWithChildren = (props) => {
  const { children } = props

  const [tonConnectUI] = useTonConnectUI()

  const userWalletAddress = useTonAddress()

  const { webApp, user } = useTelegram()

  const { data: profileInfo, isLoading: isProfileInfoLoading } = useQuery({
    queryKey: ['profileInfo'],
    queryFn: () => getProfile({ telegram: user?.username }),
    enabled: Boolean(user?.username),
  })

  const { data: invitedByProfileInfo } = useQuery({
    queryKey: ['referralProfileInfo'],
    queryFn: () => getProfile({ referral_code: profileInfo?.referral_id }),
    enabled: Boolean(profileInfo?.referral_id),
  })

  const { data: balance, refetch: refetchProfileBalance } = useQuery({
    queryKey: ['userBalance'],
    queryFn: () => getBalance(userWalletAddress, 'testnet'),
    enabled: !!userWalletAddress,
  })

  const { data: savedProfileData, mutate: saveProfileInfo } = useMutation({
    mutationKey: ['saveProfile'],
    mutationFn: (profileData: ProfileInfoType) => saveProfile(profileData),
  })

  useEffect(() => {
    if (webApp && savedProfileData) {
      webApp.CloudStorage.setItem('isAlreadyAuthorized', 'true')
    }
  }, [savedProfileData, webApp])

  useEffect(() => {
    if (webApp && user) {
      const initData = new URLSearchParams(webApp.initData)

      const referrer_id = initData.get('start_param')

      if (!isProfileInfoLoading && !profileInfo) {
        saveProfileInfo({
          email: '',
          name: user.first_name + user.last_name,
          referrer_id: referrer_id || '',
          telegram: user.username,
          walletAddress: '',
          image: '',
          telegramInitData: webApp.initData,
        })

        return
      }
    }
  }, [isProfileInfoLoading, profileInfo, saveProfileInfo, user, webApp])

  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      if (wallet !== null) {
        if (Chains[wallet.account.chain] === 'mainnet') {
          alert('Please, connect testnet wallet')

          tonConnectUI.disconnect()

          return
        }
      }
    })
  }, [profileInfo, tonConnectUI])

  const value = {
    profileInfo,
    balance,
    invitedBy: {
      username: invitedByProfileInfo?.telegram,
    },
    refetchProfileBalance,
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
