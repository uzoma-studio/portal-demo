import { config } from './template-config'
import styled from 'styled-components'

const { style } = config

export const StyledContainer = styled.div`
    background: ${style.backgroundColor};
    color: ${style.bodyTextColor};
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    overflow: auto;
`

export const StyledPageOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 10px;
    width: 80%;
    /* min-height: 100vh; */
    z-index: 999;
    overflow-y: scroll;
    overflow-x: hidden;

    .content {
        color: ${style.contentTextColor};
    }

    h1 {
        margin: 30px 0;
        color: ${style.headerFontColor};
        font-family: ${style.headerFont};
        font-weight: bold;
        font-size: 32px;
    }

    .close-btn {
        font-size: 32px;
        cursor: pointer;
        color: red;
        position: absolute;
        right: 50px;
        margin: 0;
        font-weight: bold;
    }
`