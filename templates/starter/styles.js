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
    padding: 2.5rem 5rem;
`