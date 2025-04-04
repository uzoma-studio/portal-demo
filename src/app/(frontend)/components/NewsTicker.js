'use client'

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { globalConfig } from '../template-config';
import { getContent } from 'data/fetchContent.server';

const tickerAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

const StyledTicker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 3rem;
  padding-left: 100%;
  box-sizing: content-box;
  background-color: ${({ $backgroundColor = '#ccc' }) => $backgroundColor};

    div.content {
        display: inline-block;
        height: 3rem;
        line-height: 3rem;
        white-space: nowrap;
        padding-right: 100%;
        box-sizing: content-box;
        animation: ${tickerAnimation} ${({ $scrollSpeed = '45s' }) => $scrollSpeed} linear infinite;
    }
`;

const TickerItem = styled(Link)`
  display: inline-block;
  padding: 0 ${({ $itemSpacing = '3rem' }) => $itemSpacing};
  font-size: 1.25rem;
  text-transform: uppercase;
  color: #000 !important;
  text-decoration: none;
  font-family: ${globalConfig.style.bodyFont}
`;

const NewsTicker = ({ backgroundColor, scrollSpeed, itemSpacing }) => {

    const [ tickerItems, setTickerItems ] = useState(null)

    useEffect(() => {

        async function fetchData() {
            const data = await getContent('newsTicker');
            console.log(data);
            
            setTickerItems(data.docs[0].tickerItems)
        }

        fetchData();
    }, [])
    
    return (
        <StyledTicker 
            $backgroundColor={backgroundColor}
            $scrollSpeed={scrollSpeed}
        >
            <div className='content'>
                {
                    tickerItems && tickerItems.map(({text, link, id}) => 
                        <TickerItem $itemSpacing={itemSpacing} key={id} href={link ? link : '/'}>{text}</TickerItem>
                    )
                }
            </div>
        </StyledTicker>
    );
};

export default NewsTicker;