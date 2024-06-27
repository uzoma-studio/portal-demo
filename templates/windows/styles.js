import { config } from './template-config'
import styled from 'styled-components'

const { style } = config

export const StyledContainer = styled.div`
    height: 100vh;
    background: ${style.backgroundColor};
`