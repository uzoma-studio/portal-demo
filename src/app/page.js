import React from 'react'

import ActiveTemplate from './activeTemplate'

const Home = () => {
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <>
      <ActiveTemplate pages={pagesData} />
    </>
  );
}

export default Home