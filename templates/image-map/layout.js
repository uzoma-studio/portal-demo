import React from 'react'
import image from './kiefer.png'

const Layout = () => {
    
  return (
    <>
        <img src={image.src} alt='background' style={{height: '100vh'}} useMap="#image-map" />
        <map name="image-map">
            <area target="" alt="" title="" href="" coords="880,315,1160,255,1165,455,885,525" shape="poly" onClick={() => console.log('spot clicked!')}/>
            <area target="" alt="" title="" href="" coords="2190,222,2425,287,2418,650,2183,592" shape="poly" />
            <area target="" alt="" title="" href="" coords="118,712,59" shape="circle" />
        </map>
    </>
  )
}

export default Layout