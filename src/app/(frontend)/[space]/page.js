'use client'

import React, { useEffect, useState } from 'react'
import { getCurrentSpace, fetchPages } from '../../../../data/fetchContent.server'
import { SpaceContext } from '../context/SpaceProvider'
import ActiveTemplate from '../activeTemplate'

const SpacePage = () => {

    const [settings, setSettings] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
        
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                setError(null)
                
                const spaceDomain = window.location.pathname.split('/')[1]
                const space = await getCurrentSpace(spaceDomain)

                const data = await fetchPages(space.id)
                setData(data)

                const { siteTitle, siteDescription, backgroundImage } = space.settings
                const settings = {
                    space,
                    spaceId: space.id,
                    site: {siteTitle, siteDescription, backgroundImage},
                    theme: space.settings.theme
                }
                setSettings(settings)
            } catch (err) {
                setError(err.message || 'Failed to load space data')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();
    }, []) // Removed data from dependencies to prevent infinite loop

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <p className="text-2xl font-display animate-pulse">
                    Loading Space...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <p>{error}</p>
        )
    }

    if (!settings || !data) {
        return (
            <p>No data available</p>
        )
    }
    
    return (
        <SpaceContext.Provider value={settings}>
            <ActiveTemplate pages={data.docs} currentSpace={settings.space.domain} />
        </SpaceContext.Provider>
    )
}

export default SpacePage