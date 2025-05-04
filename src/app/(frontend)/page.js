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

  const data = await fetchPages()
  let siteSettings = {}
  let themeSettings = {}

  try {
    const result = await getSiteSettings();
    siteSettings = result?.docs?.[0] || {};
  } catch (err) {
    console.warn('WARNING: Site settings not ready, using fallback.');
  }


  try {
    const result = await getThemeSettings();
    themeSettings = result?.docs?.[0] || {};
  } catch (err) {
    console.warn('WARNING: Theme settings not ready, using fallback.');
  }

  const settings = {
    site: siteSettings,
    theme: themeSettings,
  };
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <AppProvider value={settings}>
      <ActiveTemplate pages={data.docs} />
    </AppProvider>
  );
}

export default Home