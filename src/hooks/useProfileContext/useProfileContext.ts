import { useContext } from 'react'
import { ProfileContext } from 'app/providers/ProfileProvider'

export const useProfileContext = () => useContext(ProfileContext)
