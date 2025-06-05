import React, { useContext } from 'react'
import { SpaceContext } from '@/context/SpaceProvider'
import Image from 'next/image'

import { StyledBackgroundContainer } from '../styles'

import RenderPages from '@/utils/renderPages';
import SinglePage from './single'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Environment from './environment'

const Index = ({ pages }) => {
    const settings = useContext(SpaceContext)
    const config = settings.theme
    const backgroundImage = settings.site.backgroundImage
    const imageRenderMode = config.style?.backgroundImageRenderMode || 'center'
    const environment = config.style?.environment || 'park'
    
    return (
        <>
            <Environment environment={environment} />
            <Header />
            <StyledBackgroundContainer $settings={config}>
                { backgroundImage && config.style.backgroundMode === 'image' ?
                    imageRenderMode === 'background' ? (
                        <Image 
                            src={settings.site.backgroundImage.url}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            alt={settings.site.backgroundImage?.alt}
                        />
                    ) : (
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Image 
                                src={settings.site.backgroundImage.url}
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
                                alt={settings.site.backgroundImage?.alt}
                            />
                        </div>
                    )
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
                <Footer />
            </StyledBackgroundContainer>
        </>
    )
}

export default Index