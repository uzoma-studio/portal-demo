import React from 'react'

import { getData, dataMapper } from '../../data/fetchContent'
import ActiveTemplate from './components/activeTemplate'
import { AppProvider } from '../../context'

const Home = async () => {

  // Retrieve data from the server at build time
  const pages = await getData('pages')
  const siteSettings = await getData('setting')

  // Take the data from the CMS and transform it to a format template files can use instead of interacting with CMS schema directly
  const pagesData = dataMapper(pages.data)
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <AppProvider value={siteSettings.data.attributes}>
      <ActiveTemplate pages={pagesData} />
    </AppProvider>
  );
}

export default Home