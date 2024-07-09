'use client'

import React, { useEffect, useState } from 'react'

// Import various templates
import Islands from '../../templates/islands/layout'
import Windows from '../../templates/windows/layout'
import Planets from '../../templates/planets/layout'
import Notion from '../../templates/notion/layout'

const ActiveTemplate = ({ pages }) => {

  // Index templates
  // The same `pages` data is used across all templates in the project
  const templates = {
    islands: <Islands pages={pages} />,
    windows: <Windows pages={pages} />,
    planets: <Planets pages={pages} />,
    notion: <Notion pages={pages} />,
  }

  const defaultTemplate = templates.islands
  const [ activeTemplate, setActiveTemplate ] = useState(defaultTemplate)

  useEffect(() => {
    if(window && window.location.search !== '') {
      const url = new URL(window.location.href)
      const templateParam = url.searchParams.get('template');

      if(templates[templateParam]){
        setActiveTemplate(templates[templateParam])
      } else {
        setActiveTemplate(defaultTemplate)
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