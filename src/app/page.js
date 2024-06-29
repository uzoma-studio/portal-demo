import React from 'react'

import { getData } from '../../data/fetchContent'
import ActiveTemplate from './components/activeTemplate'
import { AppProvider } from '../../context'

const Home = async () => {

  // Retrieve data from the server at build time
  const pages = await getData('pages')
  const siteSettings = await getData('setting')
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <AppProvider value={siteSettings.data.attributes}>
      <ActiveTemplate pages={pages} />
    </AppProvider>
  );
}

export default Home