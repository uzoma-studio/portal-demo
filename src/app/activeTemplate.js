'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Import various templates
import ImageMap from '../../templates/image-map/page'
import Islands from '../../templates/islands/page'
import Notion from '../../templates/notion/page'
import Windows from '../../templates/windows/page'

const ActiveTemplate = ({ pages }) => {

  // Index templates
  // The same `pages` data is used across all templates in the project
  // TODO: use Context or sth instead of having to pass this prop over and over again
  const templates = {
    islands: <Islands pages={pages} />,
    windows: <Windows pages={pages} />,
    notion: <Notion pages={pages} />,
    imagemap: <ImageMap pages={pages} />
  }

  const defaultTemplateName = 'islands'
  const [activeTemplate, setActiveTemplate] = useState(templates[defaultTemplateName]);

  useEffect(() => {
      const storedTemplateName = localStorage.getItem('activeTemplate');
      if (storedTemplateName && templates[storedTemplateName]) {
          setActiveTemplate(templates[storedTemplateName]);
      }
  }, []);

  const router = useRouter()

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