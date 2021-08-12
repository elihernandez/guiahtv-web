import React from 'react'
import styled from 'styled-components'

export const ErrorMessageReload = ({ message, subMessage, onClick }) => {
	return (
		<Wrapper>
			<Text>{message}</Text>
            <SubText>{subMessage}</SubText>
			<Button onClick={onClick}>Volver a intentar</Button>
		</Wrapper>
	)
}

export const ErrorMessageDefault = ({ message, subMessage }) => {
	return (
		<Wrapper>
			<Text>{ message }</Text>
            <SubText>{subMessage}</SubText>
		</Wrapper>
	)
}


const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto 0;
`

const Text = styled.p`
    font-size: 20px;
    text-align: center;
    margin: .5vw 0;
`

const SubText = styled.p`
    font-size: 16px;
    text-align: center;
    margin: .5vw 0;
`

const Button = styled.button`
    font-size: 16px;
    text-align: center;
    color: white;
    border: .125vw solid white;
    font-family: "Poppins", sans-serif;
    padding: 10px 20px;
    border-radius: 4px;
    margin: .5vw 0;
    transition: all 150ms ease-in-out;

    &:hover {
        background: white;
        color: black;
    }
`