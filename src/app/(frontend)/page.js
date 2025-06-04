import React from 'react'
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
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <AppProvider value={{ title: 'Home' }}>
      <h1>Step into the Portal</h1>
    </AppProvider>
  );
}

export default Home