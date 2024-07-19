import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    position: absolute;
    top: ${props => `${props.$position.y}%`};
    left: ${props => `${props.$position.x}%`};
    color: red;
    font-weight: bold;
    font-size: 28px;
`

const CloseButton = ({ closeFn, position }) => {
  return (
    <StyledButton onClick={closeFn} $position={position}>
        x
    </StyledButton>
  )
}

export default CloseButton