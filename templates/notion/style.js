import { config } from './template-config'
import styled from 'styled-components'

const { style } = config

export const StyledContainer = styled.div`
    background: ${style.backgroundColor};

    .header {
        background: ${style.headerImage};
        height: 15rem;
    }

    .content {
        padding: 5rem 15rem;

        .pages-container {
            margin-top: 2rem;
            display: flex;

            div {
                width: 50%
            }
        }
    }
`