import React from 'react'

import { findPage } from '../../../utils/utils';
import { config } from '../template-config';

import RenderPages from '@/app/(frontend)/utils/renderPages';
import SinglePage from './single'

const Index = ({ pages }) => {
    return (
        <>
            {
                pages.map((pageData, index) =>
                    <RenderPages key={index}>
                        <SinglePage
                            key={pageData.id}
                            pageData={pageData}
                            pagePosition={findPage(config.pageConfig, pageData.id).position}
                        />
                    </RenderPages>
                )
            }
        </>
    )
}

export default Index