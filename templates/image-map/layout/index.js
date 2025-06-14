import React, { useState } from 'react'
import Image from 'next/image'

import { StyledBackgroundContainer, StyledDisplayModeLayout, StyledDisplayModeWrapper } from '../styles'

import RenderPages from '@/utils/renderPages';
import SinglePage from './single'
import { useSpace } from '@/context/SpaceProvider';

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Environment from './environment'

import Icon from '../../displayModes/icon'

import BuildMode from '@/widgets/SpaceEditor'

const Index = () => {

    const { pages, settings } = useSpace()
    
    const config = settings.theme
    const backgroundImage = settings.backgroundImage
    const imageRenderMode = config.style?.backgroundImageRenderMode || 'center'
    const environment = config.style?.environment || 'park'

    const [currentPageId, setCurrentPageId] = useState(null)
    const currentPage = pages.find(p => p.id === currentPageId)

    const getDisplayMode = (pageData) => {

        const displayModes = {
            icon: <Icon page={pageData} pageConfig={pageData.themeConfig} />
        }

        //use the display mode set in the page config
        return displayModes[pageData.themeConfig.displayMode]
    }

    return (
        <>
            <Environment environment={environment} />
            <Header />
            <BuildMode isCreatePageMode={true} />
            <StyledBackgroundContainer $settings={config}>
                { backgroundImage && config.style.backgroundMode === 'image' ?
                    imageRenderMode === 'background' ? (
                        <Image 
                            src={settings.backgroundImage.url}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            alt={settings.backgroundImage?.alt}
                        />
                    ) : (
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Image 
                                src={settings.backgroundImage.url}
                                width={1200}
                                height={800}
                                style={{
                                    objectFit: 'contain',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                                className="md:w-[70%] lg:w-[60%] xl:w-[50%]"
                                quality={100}
                                alt={settings.backgroundImage?.alt}
                            />
                        </div>
                    )
                    :
                    <div className='background' />
                }
                {
                    config && pages.map((pageData) =>
                        <StyledDisplayModeWrapper key={pageData.id} onClick={() => setCurrentPageId(pageData.id)}>
                            {   getDisplayMode(pageData)    }
                        </StyledDisplayModeWrapper>
                    )
                }
                {
                    currentPage && 
                        <RenderPages>
                            <SinglePage
                                pageData={currentPage}
                                pageConfig={currentPage.themeConfig}
                                pageDisplayStyle='center-modal'
                                showPage={currentPage}
                                setShowPage={setCurrentPageId}
                            />
                        </RenderPages>
                }
                <Footer />
            </StyledBackgroundContainer>
        </>
    )
}

export default Index