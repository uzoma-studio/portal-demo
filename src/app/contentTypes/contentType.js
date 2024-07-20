import React, { useState, useEffect } from 'react'
import { getData } from '../../../data/fetchContent'

import Blog from './Blog'

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

const ContentType = ({ type }) => {

    /**
     * Determines the API endpoint based on the content type
     * 
     * @returns {string|null} The endpoint string or null if the type is not recognized
     */
    const contentTypeEndPoint = () => {
        switch (type) {
            case 'Blog':
              return 'blog-posts'
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
            try {
                const res = await getData(contentTypeEndPoint());
                // const passDataToTheRightComponent = () => {
                //     switch (type) {
                //         case 'Blog':
                //           return <Blog data={data} />
                //         default:
                //             return null
                //     }
                // }
                // setActiveContentTypeComponent(passDataToTheRightComponent)
                setActiveContentTypeComponent(<Blog data={res.data} />)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <>{activeContentTypeComponent}</>
    )
}

export default ContentType