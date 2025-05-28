import React, { useContext } from 'react'
import { AppContext } from '../../../context';
import Image from 'next/image'

import { StyledBackgroundContainer } from '../styles'

import RenderPages from '@/app/(frontend)/utils/renderPages';
import SinglePage from './single'

import Header from '@/app/(frontend)/components/Header'

const Index = ({ pages }) => {

    const settings = useContext(AppContext)
    const config = settings.theme
    const backgroundImage = settings.site.backgroundImage
    
    return (
        <>
            <Header />
            <StyledBackgroundContainer $settings={config}>
                { backgroundImage && config.style.backgroundMode === 'image' ?
                    <Image 
                        src={settings.site.backgroundImage.url}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        alt={settings.site.backgroundImage?.alt}
                    />
                    :
                    <div className='background' />
                }
                {
                    config && pages.map((pageData) =>
                        <RenderPages key={pageData.id}>
                            <SinglePage
                                key={pageData.id}
                                pageData={pageData}
                                pageConfig={pageData.themeConfig}
                                pageDisplayStyle='center-modal'
                            />
                        </RenderPages>
                    )
                }
            </StyledBackgroundContainer>
        </>
    )
}

export default Index