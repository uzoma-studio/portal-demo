import styled from 'styled-components'

export const StyledContainer = styled.div`
    background: ${props => props.$config?.style?.backgroundColor};
    color: ${props => props.$config?.style?.bodyTextColor};
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    overflow: auto;
    padding: 2.5rem 5rem;
`