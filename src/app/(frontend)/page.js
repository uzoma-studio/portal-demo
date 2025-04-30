import React from 'react'

// import { getData, dataMapper } from '../../../data/fetchContent'
import { fetchPages, getSiteSettings, getThemeSettings } from '../../../data/fetchContent.server'
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
  const siteSettings = await getSiteSettings()
  const themeSettings = await getThemeSettings()

  const settings = {
    site: siteSettings.docs?.[0] || {},
    theme: themeSettings.docs?.[0] || {},
  };
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <AppProvider value={settings}>
      <ActiveTemplate pages={data.docs} />
    </AppProvider>
  );
}

export default Home