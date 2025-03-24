import React from 'react'

// import { getData, dataMapper } from '../../../data/fetchContent'
import { fetchPages, getSiteSettings } from '../../../data/fetchContent.server'
import ActiveTemplate from './activeTemplate'
import { AppProvider } from '../../../context'

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
  // const pages = await getData('pages')
  // const siteSettings = await getData('setting')

  const data = await fetchPages()
  const settings = await getSiteSettings()
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <AppProvider value={settings.docs[0]}>
      <ActiveTemplate pages={data.docs} />
    </AppProvider>
  );
}

export default Home