import React from 'react'

import ActiveTemplate from './activeTemplate'

import { appState } from './layout'

const Home = () => {

  const { pages } = appState

  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <>
      { pages && <ActiveTemplate pages={pages} /> }
    </>
  );
}

export default Home