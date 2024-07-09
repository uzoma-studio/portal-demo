import React from 'react'
import Link from 'next/link'

const RenderPages = ({ children, openPageViaLink, pageSlug }) => {
  return <>
        {
            openPageViaLink ?
                <Link href={pageSlug}>
                    {children}
                </Link>
                :
                <>{children}</>
        }
    </>
}

export default RenderPages

// const RenderPages = ({ pages, ...extraProps }) => {
//     return (
//       <>
//           {
//               pages.map((pageData) => 
//                   <PagesComponent 
//                       key={pageData.id}
//                       pageData={pageData}
//                       {...extraProps}
//                   />
//               )
//           }
//       </>
//     )
//   }
  
//   export default RenderPages