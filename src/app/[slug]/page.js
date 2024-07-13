// Utilises app/page.js for single page rendering also
// For most/all themes, there is/should be conditional logic to determine whether to render the template layout or a specific page
// By replicating app/page.js, we allow the possibility of using more conventional Next routing while also solving for the problem
// of the single page template overriding the layout template (see comment in Notion board)

import React from 'react'
import Page from '../page'

const SinglePage = () => {

  return (
    <>
      <Page />
      {/* more stuff here */}
    </>
  );
}

export default SinglePage