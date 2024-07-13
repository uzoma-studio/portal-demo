'use client'

import React, { useState, useEffect, useContext } from 'react'
import { renderCurrentPage } from '../../../utils/utils'

import IslandsPage from '../../../templates/islands/page'
import NotionPage from '../../../templates/notion/page'

import { AppContext } from '../../../context'

/**
 * I forgot that the problem with this approach (dynamic routing instead of the current hash-based routing) was that it renders a new page
 * with a new UI...this is not the desired effect for many themes which we want to look they're still part of the layout UI
 */

const Page = () => {

    const [pageData, setPageData] = useState(null)
    const [activePage, setActivePage] = useState(null)

    const context = useContext(AppContext)

    useEffect(() => {
        setPageData(renderCurrentPage(context.pages))
    }, []);

    // use Context to store and retrieve page component details
    const pageTemplates = {
        islands: <IslandsPage data={pageData} />,
        notion: <NotionPage data={pageData} />
    }

    useEffect(() => {
        const storedTemplateName = localStorage.getItem('activeTemplate');
        
        if(pageData){
            console.log('hello!')
            if (storedTemplateName && pageTemplates[storedTemplateName]) {
                setActivePage(pageTemplates[storedTemplateName]);
            } //else redirect to '/'
        }
    }, [pageData]);
    
    return (
        <div>
            {activePage}
        </div>
    )
}

export default Page