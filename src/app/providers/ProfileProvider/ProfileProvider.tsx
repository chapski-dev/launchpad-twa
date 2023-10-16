import { createContext, useEffect } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useMutation, useQuery } from 'react-query'
import { getProfile, saveProfile } from 'api'
import { ProfileInfoType } from 'api/types'
import { Chains } from 'constants/blockchain'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { FCWithChildren } from 'types/app'
import { getBalance } from 'utils/getBalance'

export type ProfileContextType = {
  profileInfo?: any
  balance?: string
  invitedBy?: {
    username: string
  } | null
}

export const ProfileContext = createContext<ProfileContextType>({})

export const ProfileProvider: FCWithChildren = (props) => {
  const { children } = props

  const [tonConnectUI] = useTonConnectUI()

  const userWalletAddress = useTonAddress()

  const { webApp, user } = useTelegram()

  const { data: profileInfo, isLoading: isProfileInfoLoading } = useQuery(
    ['profileInfo'],
    () => getProfile({ telegram: user?.username }),
    {
      enabled: Boolean(user?.username),
    }
  )

  const { data: invitedByProfileInfo } = useQuery(
    ['invitedByProfileInfo'],
    () => getProfile({ referral_code: profileInfo?.referral_id }),
    {
      enabled: Boolean(profileInfo?.referral_id),
    }
  )

  const { data: balance } = useQuery(
    ['userBalance'],
    () => getBalance(userWalletAddress, 'testnet'),
    {
      enabled: !!userWalletAddress,
    }
  )

  const { mutate: saveProfileInfo } = useMutation(
    ['saveProfile'],
    (profileData: ProfileInfoType) => saveProfile(profileData),
    {
      onSuccess: () => {
        if (webApp) {
          webApp.CloudStorage.setItem('isAlreadyAuthorized', 'true')
        }
      },
    }
  )

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
    balance: balance?.toFixed(2),
    invitedBy: {
      username: invitedByProfileInfo?.telegram,
    },
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
