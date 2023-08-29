import { useEffect } from 'react'
import { useWebApp } from '@twa.js/sdk-react'
import { Routes, Route } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { Home } from './Home/Home'
import { Project } from './Project/Project'

export const PagesConfig = () => {
  const webpApp = useWebApp()

  useEffect(() => {
    webpApp.ready()
  }, [webpApp])

  return (
    <Routes>
      <Route element={<Home />} path={AppRoutes.Home} />
      <Route element={<Project />} path={`${AppRoutes.Project}/:id`} />
    </Routes>
  )
}
