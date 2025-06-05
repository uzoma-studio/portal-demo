import { useEffect, useState } from 'react';

const usePageImages = (pages) => {
    const [pageImages, setPageImages] = useState([]);

    useEffect(() => {
        const images = pages.map(page => page.coverImage);
        setPageImages(images);
    }, [pages]);

    return pageImages;
};

export default usePageImages;