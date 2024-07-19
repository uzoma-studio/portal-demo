import { config } from './template-config'
import styled from 'styled-components'

const { style } = config

export const StyledContainer = styled.div`
    background: ${style.backgroundColor};

    .content {
        padding: 5rem 15rem;

        .pages-container {
            margin-top: 2rem;
            display: flex;
            justify-content: space-between;
        }
    }
`

export const StyledPageIcon = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 10px;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
    cursor: pointer;
    color: ${style.bodyTextColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .img-container {
        height: 75%;
        border-bottom: 1px solid #ccc;
    }

    h6 {
        font-family: ${style.bodyFont};
    }
`