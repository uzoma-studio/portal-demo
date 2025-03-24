'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Import various templates
import ImageMap from '../../../templates/image-map/page'
import Islands from '../../../templates/islands/page'
import Notion from '../../../templates/notion/page'
import Windows from '../../../templates/windows/page'
import Starter from '../../../templates/starter/page'

/**
 * ActiveTemplate component
 * 
 * This component dynamically renders one of several templates based on the current
 * active template. The active template can be set via a query parameter or from
 * localStorage.
 * 
 * @param {Object} props - The props object
 * @param {Array} props.pages - The data to be passed to each template
 * 
 * @returns {JSX.Element} The currently active template component
 */
const ActiveTemplate = ({ pages }) => {

  // Index templates
  // The same `pages` data is used across all templates in the project
  // TODO: use Context or sth instead of having to pass this prop over and over again
  const templates = {
    islands: <Islands pages={pages} />,
    windows: <Windows pages={pages} />,
    notion: <Notion pages={pages} />,
    imagemap: <ImageMap pages={pages} />,
    starter: <Starter pages={pages} />
  }

  const defaultTemplateName = 'islands'
  const [activeTemplate, setActiveTemplate] = useState(templates[defaultTemplateName]);

  // Load the active template from localStorage if it exists
  useEffect(() => {
      const storedTemplateName = localStorage.getItem('activeTemplate');
      if (storedTemplateName && templates[storedTemplateName]) {
          setActiveTemplate(templates[storedTemplateName]);
      }
  }, []);

  const router = useRouter()

  // Set the active template based on the URL query parameter
  useEffect(() => {
    if(window && window.location.search !== '') {
      const url = new URL(window.location.href)
      const templateParam = url.searchParams.get('template');
      
      if(templates[templateParam]){
        setActiveTemplate(templates[templateParam])
        localStorage.setItem('activeTemplate', templateParam);
        router.push('/')
      } else {
        setActiveTemplate(templates[defaultTemplateName])
        localStorage.setItem('activeTemplate', defaultTemplateName);
      }
    }

    return () => {}
  }, [])
  

  return (
    <>
      {activeTemplate}
    </>
  );
}

export default ActiveTemplate