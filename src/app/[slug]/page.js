'use client'

import React, { useState, useEffect } from 'react'
import { renderCurrentPage } from '../../../utils/utils'

import IslandsPage from '../../../templates/islands/page'
import NotionPage from '../../../templates/notion/page'

const Page = () => {

    const [pageData, setPageData] = useState(null)
    const [activePage, setActivePage] = useState(null)

    useEffect(() => {
        setPageData(renderCurrentPage(pages))
    }, []);

    const pages = {
        islands: <IslandsPage data={pageData} />,
        notion: <NotionPage data={pageData} />
    }

    useEffect(() => {
        const storedTemplateName = localStorage.getItem('activeTemplate');
        if (storedTemplateName && pages[storedTemplateName]) {
            setActivePage(templates[storedTemplateName]);
        }
    }, []);
    
    return (
        <div>
            {activePage}
        </div>
    )
}

export default Page