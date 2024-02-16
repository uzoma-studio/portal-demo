'use client'

import React, { useEffect, useState } from 'react'

// Import various templates
import Islands from '../../templates/islands/layout'
import Windows from '../../templates/windows/layout'

const Home = () => {

  // Index templates
  const templates = {
    islands: <Islands />,
    windows: <Windows />
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
    <div>
      {activeTemplate}
    </div>
  );
}

export default Home