import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Resume from './pages/Resume/Resume'
// import Profile from './pages/Profile';
import Settings from './pages/Settings/Settings'
import KakaoRedirection from './utils/socialLogin/kakaoRedirection'

const router = (openLoginModal, openAccountModal) =>
  createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout
          openLoginModal={openLoginModal}
          openAccountModal={openAccountModal}
        />
      ),
      children: [
        { path: '', element: <Home /> },
        { path: 'oauth/kakao', element: <KakaoRedirection /> },
        { path: 'resume/:id', element: <Resume /> },
        // { path: 'profile', element: <Profile /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
  ])

export default router
