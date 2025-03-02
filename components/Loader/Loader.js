import React from 'react'
import styled from 'styled-components'

export default function Loader() {
  return (
    <Container/>
  )
}

const Container = styled.div`
height: 50px;
  aspect-ratio: 2;
  border: 10px solid #000;
  box-sizing: border-box;
  background: 
    radial-gradient(farthest-side,#fff 98%,#0000) left/20px 20px,
    radial-gradient(farthest-side,#fff 98%,#0000) left/20px 20px,
    radial-gradient(farthest-side,#fff 98%,#0000) center/20px 20px,
    radial-gradient(farthest-side,#fff 98%,#0000) right/20px 20px,
    #000;
  background-repeat: no-repeat;
  filter: blur(4px) contrast(10);
  animation: l14 1s infinite;
}
@keyframes l14 {
  100%  {background-position:right,left,center,right}
}`
