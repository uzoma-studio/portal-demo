import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    h1, h2, h3, h4, h5, h6 {
        font-family: ${props => props.$theme?.style?.headerFont || 'monospace'};
    }
`