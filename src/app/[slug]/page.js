'use client'

import React, { useState, useEffect, useContext } from 'react'

import ActiveTemplate from '../activeTemplate'
import { AppContext } from '../../../context'
import { renderCurrentPage } from '../../../utils/utils'

const Page = () => {

    const context = useContext(AppContext)

    const [pageData, setPageData] = useState(null)

    useEffect(() => {
        setPageData(renderCurrentPage(context.pages))
    }, []);

    console.log(pages);
  
  // This is a server component which uses a client component for state mgt and interactivity:
  return (
    <>
      { pageData && <ActiveTemplate pages={pageData} /> }
    </>
  );
}

export default Page