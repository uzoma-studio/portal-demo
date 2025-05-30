import React, { useContext } from 'react'
import { AppContext } from '../../../context';
import Image from 'next/image'

import { StyledBackgroundImageContainer } from '../styles'

import { findPage } from '../../../utils/utils';

import RenderPages from '@/app/(frontend)/utils/renderPages';
import SinglePage from './single'

import NewsTicker from '@/app/(frontend)/components/NewsTicker'

const Index = ({ pages }) => {

    const settings = useContext(AppContext)
    const config = settings.theme.config
    
    return (
        <>
            <NewsTicker />
            <StyledBackgroundImageContainer $settings={config}>
                <Image 
                    src={config?.templateImage?.url}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt={config?.templateImage?.alt}
                />
                {
                    config && pages.map((pageData) =>
                        <RenderPages key={pageData.id}>
                            <SinglePage
                                key={pageData.id}
                                pageData={pageData}
                                pageConfig={findPage(config.pageConfig, pageData.id)}
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