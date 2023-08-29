import { Routes, Route } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { Home } from './Home/Home'
import { Participate } from './Participate/Participate'
import { Project } from './Project/Project'

export const PagesConfig = () => {
  return (
    <Routes>
      <Route element={<Home />} path={AppRoutes.Home} />
      <Route element={<Project />} path={`${AppRoutes.Project}/:id`} />
      <Route element={<Participate />} path={`${AppRoutes.Participate}/:id`} />
    </Routes>
  )
}
