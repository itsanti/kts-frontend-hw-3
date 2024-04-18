import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from 'config/constants'
import RepoList from './pages/RepoList'
import RepoPage from './pages/RepoPage'
import AppHeader from './pages/components/AppHeader'

function App() {

  return (
    <React.Fragment>
      <AppHeader />
      <main>
        <Routes>
          <Route index element={<RepoList />} />
          <Route path={ROUTES.repoByName} element={<RepoPage />} />
          <Route path={ROUTES.noMatch} element={<RepoList />} />
        </Routes>

      </main>
    </React.Fragment>
  )
}

export default App
