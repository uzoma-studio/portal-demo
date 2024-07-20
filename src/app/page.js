import React from 'react'

import { getData, dataMapper } from '../../data/fetchContent'
import ActiveTemplate from './activeTemplate'
import { AppProvider } from '../../context'

/**
 * Home component
 * 
 * This is a server-side component that fetches data from the server and provides
 * it to the client-side components for rendering. The component uses a provider
 * for context management and dynamically renders templates based on the fetched data.
 * 
 * @returns {JSX.Element} The Home page with the appropriate template and site settings
 */
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