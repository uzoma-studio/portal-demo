import React from 'react'
import Image from 'next/image'

import { StyledBackgroundImageContainer } from '../styles'

import { findPage } from '../../../utils/utils';
import { config } from '../template-config';

import RenderPages from '@/app/utils/renderPages';
import SinglePage from './single'

const Index = ({ pages }) => {

    return (
        <StyledBackgroundImageContainer>
            <Image 
                src='/assets/image-map/kiefer.png'
                layout="fill"
                objectFit="cover"
                quality={100}
                alt='Image of Kiefers room'
            />
            {
                pages.map((pageData) =>
                    <RenderPages>
                        <SinglePage
                            key={pageData.id}
                            pageData={pageData}
                            pagePosition={findPage(config.pageConfig, pageData.id).position}
                        />
                    </RenderPages>
                )
            }
        </StyledBackgroundImageContainer>
    )
}

export default Index