import React, { useContext } from 'react'
import { AppContext } from '../../../context';
import Image from 'next/image'

import { StyledBackgroundImageContainer } from '../styles'

import RenderPages from '@/app/(frontend)/utils/renderPages';
import SinglePage from './single'

import Header from '@/app/(frontend)/components/Header'

const Index = ({ pages }) => {

    const settings = useContext(AppContext)
    const config = settings.theme

    return (
        <>
            <Header />
            <StyledBackgroundImageContainer $settings={config}>
                <Image 
                    src={settings.site.backgroundImage?.url}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt={settings.site.backgroundImage?.alt}
                />
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
            </StyledBackgroundImageContainer>
        </>
    )
}

export default Index