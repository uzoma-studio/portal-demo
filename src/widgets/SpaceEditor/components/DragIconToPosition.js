import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledMessage } from '@/styles/rootStyles';
import { updatePage } from 'data/createContent.server';

const EDGE_THRESHOLD = 20; // pixels from edge to show cursor

const StyledDragContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    cursor: ${props => props.cursor};
`;

const StyledPagePreview = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translate(${props => props.x}px, ${props => props.y}px);
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #666;
    transition: box-shadow 0.2s ease;
    ${props => props.isDragging && `
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    `}
`;

const StyledGrid = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
`;

const DragIconToPosition = ({ 
    children,
    dragPosition,
    setDragPosition,
    size = { width: 60, height: 60 }, //default values
    containerRef,
    showGrid = true,
    setIsPositioning,
    pageData
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [cursor, setCursor] = useState('move');
    const [position, setPosition] = useState(dragPosition)

    const getCursorFromPosition = (e, pageRect) => {
        const { clientX, clientY } = e;
        const { left, right, top, bottom } = pageRect;
        
        const isNearLeft = Math.abs(clientX - left) < EDGE_THRESHOLD;
        const isNearRight = Math.abs(clientX - right) < EDGE_THRESHOLD;
        const isNearTop = Math.abs(clientY - top) < EDGE_THRESHOLD;
        const isNearBottom = Math.abs(clientY - bottom) < EDGE_THRESHOLD;

        if (isNearLeft && isNearTop) return 'nw-resize';
        if (isNearRight && isNearTop) return 'ne-resize';
        if (isNearLeft && isNearBottom) return 'sw-resize';
        if (isNearRight && isNearBottom) return 'se-resize';
        if (isNearLeft || isNearRight) return 'ew-resize';
        if (isNearTop || isNearBottom) return 'ns-resize';
        
        return 'move';
    };

    useEffect(() => {

        const handleMouseMove = (e) => {
            if (!isDragging) {
                // Update cursor based on mouse position relative to page
                const pageRect = {
                    left: position.x * window.innerWidth / 100,
                    right: position.x * window.innerWidth / 100 + size.width,
                    top: position.y * window.innerHeight / 100,
                    bottom: position.y * window.innerHeight / 100 + size.height
                };
                setCursor(getCursorFromPosition(e, pageRect));
                return;
            }

            const deltaX = e.clientX - dragStart.x;
            const deltaY = e.clientY - dragStart.y;

            // Convert pixel movement to percentage
            const newX = Math.max(0, Math.min(100, position.x + (deltaX / window.innerWidth) * 100));
            const newY = Math.max(0, Math.min(100, position.y + (deltaY / window.innerHeight) * 100));

            console.log({ x: newX, y: newY })
            setPosition({ x: newX, y: newY });
            setDragStart({ x: e.clientX, y: e.clientY });
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                handleSave()
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart, position, size]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleSave = async () => {
        const updatedPage = await updatePage(pageData.id, {
            ...pageData,
            themeConfig: {
                ...pageData.themeConfig,
                position: {
                    x: position.x,
                    y: position.y
                }
            }
        });
        console.log(updatedPage);
        setIsPositioning(false)
    }

    return (
        <StyledDragContainer 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            style={{ cursor }}
        >
            {showGrid && <StyledGrid />}
            { children }
            {message.text && (
                <StyledMessage className={message.type}>
                    {message.text}
                </StyledMessage>
            )}
        </StyledDragContainer>
    );
};

export default DragIconToPosition; 