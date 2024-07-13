import React, { useState, useEffect } from 'react'
import { getData } from '../../../data/fetchContent'

import Blog from './Blog'

const ContentType = ({ type }) => {

    const contentTypeEndPoint = () => {
        switch (type) {
            case 'Blog':
              return 'blog-posts'
            default:
                return null
        }
    }

    const [activeContentTypeComponent, setActiveContentTypeComponent] = useState(null)

    useEffect(() => {
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