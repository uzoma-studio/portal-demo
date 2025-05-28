import React from 'react'

// import { getData, dataMapper } from '../../../data/fetchContent'
import { fetchPages, getCurrentSpace, getSiteSettings } from '../../../data/fetchContent.server'
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
export const dynamic = 'force-dynamic'; //TODO: with this, data is fetched on every incoming request to the server. Find less expensive ways of handling this while ensuring config stays fresh and up to date

const Home = async () => {
  
  const space = await getCurrentSpace()
  
  const data = await fetchPages(space.id)

  const siteSettings = await getSiteSettings()
  

  const { siteTitle, siteDescription, backgroundImage } = space.settings
  const settings = {
    space,
    spaceId: space.id,
    site: {siteTitle, siteDescription, backgroundImage},
    theme: space.settings.theme,
    siteUrl: siteSettings.docs[0].siteUrl
  };
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <AppProvider value={settings}>
      <ActiveTemplate pages={data.docs} />
    </AppProvider>
  );
}

export default Home