import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styled from 'styled-components'

export default function SearchBar({setSearch}) {
    const [visible, setVisible] = useState(false)

    return (
        <Container>
            <Input
                onChange={(event) => setSearch(event.target.value)}
                placeholder='Search...'
                type='text'
                $width={visible ? '100%' : '0px'}
            />
            <Button onClick={() => {
                    setVisible(!visible)
                    setSearch('')
                }}>
                <FontAwesomeIcon icon={visible ? faClose : faSearch } width={40} height={40} />
            </Button>
        </Container>
    )
}

const Button = styled.button`
display: flex;
color:rgb(193, 193, 193);
gap: 10px;
height: 40px;
width: 40px;
font-size: 1rem;
align-items: center;
justify-content: center;
flex-direction: row;
text-decoration: none;
background-color: #292830;
border-radius: 25px;
border: none;
padding: 10px`

const Container = styled.div`
display: flex;
justify-content: flex-end;
width: 100%;
padding: 0px 20px;
gap: 10px;
align-items: center;
`

const Input = styled.input`
width: ${(props) => props.$width};
font-family: verdana;
font-size: 1rem;
padding: 5px 0px;
transition: width 0.3s ease;
box-sizing: border-box;
outline: none;
color: white;
border: none;
border-bottom: 1px solid white;
background-color: #00000000;
`
