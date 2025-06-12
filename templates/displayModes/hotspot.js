import React from 'react'
// import styled from 'styled-components'

const Icon = ({ page, pageConfig }) => {
  return (
    <div 
        className='hotspot' 
        style={{
            left: `${pageConfig.position.x}%`,
            top: `${pageConfig.position.y}%`,
        }}
        onClick={() => setShowPage(true)}
    >
        <div className="hotspot-icon" />
        <div className='hotspot-tooltip'>
            <div className="tooltip-arrow" />
            <p className='tooltip-text'>{pageConfig.hotspotName || pageData.title}</p>
        </div>
    </div>
  )
}

export default Icon