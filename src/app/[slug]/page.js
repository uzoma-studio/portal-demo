// Basically a clone of app/page.js
// For most/all themes, there is/should be conditional logic to determine whether to render the template layout or a specific page
// By replicating app/page.js, we allow the possibility of using more conventional Next routing while also solving for the problem
// of the single page template overriding the layout template (see comment in Notion board)

import React from 'react'

import ActiveTemplate from '../activeTemplate'

import { appState } from '../layout'

const Home = () => {

  const { pages } = appState

  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <>
      { pages && <ActiveTemplate pages={pages} /> }
    </>
  );
}

export default Home