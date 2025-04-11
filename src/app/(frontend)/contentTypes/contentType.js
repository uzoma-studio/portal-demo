import React, { useState, useEffect } from 'react'
import { getContent } from 'data/fetchContent.server'

import Blog from './Blog'
import Archive from './Archive'
import Chatbot from './Chatbot'
import Chat from './Chat'

/**
 * ContentType component
 * 
 * This component fetches and renders content based on the type prop provided. 
 * It dynamically determines the endpoint to fetch data from and sets the appropriate 
 * content component to display the fetched data.
 * 
 * @param {Object} props - The props object
 * @param {string} props.type - The type of content to fetch and render (e.g., 'Blog')
 * 
 * @returns {JSX.Element} The rendered content component based on the type prop
 */

const ContentType = ({ pageData }) => {
    /**
     * Determines the API endpoint based on the content type
     * 
     * @returns {string|null} The endpoint string or null if the type is not recognized
     */
    const blog = 'blog'
    const files = 'files'
    const chatbot = 'chatbot'
    const chat = 'chat-messages'

    const type = pageData.contentType

    const fetchContentByType = async () => {
        switch (type) {
            case blog:
                return getContent('posts')
            case files:
                return getContent('files')
            case chatbot:
                return getContent('chatbot')
            case chat:
                return getContent('chat-messages', 'date', 50)
            default:
                return null
        }
    }

    // State to hold the active content type component
    const [activeContentTypeComponent, setActiveContentTypeComponent] = useState(null)

    useEffect(() => {
        /**
         * Fetches data from the determined endpoint and sets the appropriate content component
         */
        const fetchData = async () => {
            const res = await fetchContentByType()
            const data = res.docs
            try {
                const passDataToTheRightComponent = () => {
                    switch (type) {
                        case blog:
                            return <Blog data={data} />
                        case files:
                            return <Archive data={data} />
                        case chatbot:
                            return <Chatbot data={data} />
                        case chat:
                            return <Chat data={data} />
                        default:
                            return null
                    }
                }
                setActiveContentTypeComponent(passDataToTheRightComponent())
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div style={{marginTop: '2rem'}}>
            {activeContentTypeComponent}
        </div>
    )
}

export default ContentType