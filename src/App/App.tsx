import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Layout from 'components/Layout'
import { ROUTES } from 'config/constants'
import RepoList from './pages/RepoList'
import RepoPage from './pages/RepoPage'


function App() {

  return (
    <Routes>
      <Route path={ROUTES.index} element={<Layout />}>
        <Route index element={<RepoList />} />
        <Route path={ROUTES.repops} element={<RepoList />} />
        <Route path={ROUTES.repoByName} element={<RepoPage />} />
      </Route>
      <Route path={ROUTES.noMatch} element={<RepoList />} />
    </Routes>
  )
}

export default App
