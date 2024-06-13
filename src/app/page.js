import React from 'react'

import { getData } from '../../data/fetchContent'
import ActiveTemplate from './components/activeTemplate'

const Home = async () => {

  // Retrieve data from the server at build time
  const pages = await getData('pages')
  
  // This is a server component which uses a client comp for state mgt and interactivity:
  return (
    <div>
      <ActiveTemplate pages={pages} />
    </div>
  );
}

export default Home