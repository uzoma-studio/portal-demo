import React from 'react'

const RenderPages = ({ pages, PagesComponent, ...extraProps }) => {
  return (
    <>
        {
            pages.map((pageData) => 
                <PagesComponent 
                    key={pageData.id}
                    pageData={pageData}
                    {...extraProps}
                />
            )
        }
    </>
  )
}

export default RenderPages