import React from 'react'
import Image from 'next/image'

import { StyledBackgroundImageContainer } from '../styles'

import { findPage } from '../../../utils/utils';
import { config } from '../template-config';

import RenderPages from '@/app/(frontend)/utils/renderPages';
import SinglePage from './single'

import NewsTicker from '@/app/(frontend)/components/NewsTicker'

const Index = ({ pages }) => {
    return (
        <>
            <NewsTicker />
            <StyledBackgroundImageContainer>
                <Image 
                    src={config.templateImage.url}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt={config.templateImage.alt}
                />
                {
                    pages.map((pageData) =>
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