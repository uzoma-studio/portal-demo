import React from 'react'
import './style.scss'

import data from '../../data/data.json'

const Layout = () => {
  return (
    <div className='galaxy'>
        <div className='planets'>
            {
                data.map(({ participant }, index) => 
                    <div className='orbit' 
                        id={`orbit-${index+1}`}
                        key={participant}
                    >
                        <div className='planet'></div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Layout