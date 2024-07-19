import { config } from './template-config'
import styled from 'styled-components'

const { style } = config

export const StyledBackgroundImageContainer = styled.div`
    img {
        z-index: -1;
    }

    .hotspot {
        position: absolute;
        background: ${style.hotspotColor};
        width: ${`${style.hotspotSize}px`};
        height: ${`${style.hotspotSize}px`};
        border-radius: 100%;
        cursor: pointer;
        z-index: -1;

        &:hover {
            width: ${`${Number(style.hotspotSize) + 2.5}px`};
            height: ${`${Number(style.hotspotSize) + 2.5}px`};
            transition: ease-in .2s;
        }
    }
`

export const StyledPage = styled.div`
    position: absolute;
    top: ${props => `${props.$position.y}%`};
    left: ${props => `${props.$position.x}%`};
    width: ${style.pageStyles.width};
    height: ${style.pageStyles.height};
    background-color: ${style.pageStyles.backgroundColor};
    border-color: ${style.pageStyles.borderColor};
    border-width: ${style.pageStyles.borderWidth};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
    overflow: scroll;
`