import React from 'react'
import styled from 'styled-components'

export const ErrorMessage = (onClick) => {
	return (
		<Wrapper>
			<Text>No se pudo cargar el contenido</Text>
			<Button onClick={onClick}>Volver a intentar</Button>
		</Wrapper>
	)
}

export const ErrorMessageTwo = () => {
	return (
		<Wrapper>
			<Text>No se pudo cargar el contenido</Text>
		</Wrapper>
	)
}


const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Text = styled.p`
    font-size: 1vw;
    text-align: center;
    margin: .5vw 0;
`

const Button = styled.button`
    font-size: .75vw;
    text-align: center;
    color: white;
    border: .125vw solid white;
    padding: .5vw;
    border-radius: 4px;
    margin: .5vw 0;
    transition: all 150ms ease-in-out;

    &:hover {
        background: white;
        color: black;
    }
`