import styled from "styled-components"

export default function PageTitle({text}) {
  return (
    <Title>{text}</Title>
  )
}

const Title = styled.h1`
font-weight: 500;
margin: 0`