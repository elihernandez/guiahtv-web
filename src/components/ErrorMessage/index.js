import React from 'react'
import styled from 'styled-components'

export const ErrorMessageReload = ({ message, subMessage, onClick, Countdown }) => {
	return (
		<Wrapper>
			<Text>{message}</Text>
            <SubText>{subMessage}&nbsp;<Countdown /></SubText>
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
    background: #232526;
`

const Text = styled.p`
    font-size: 3.6rem;
    text-align: center;
    margin: 8px 0;
`

const SubText = styled.div`
   font-size: 2.4rem;
    text-align: center;
    margin: 8px 0;
    display: flex;
    color: whitesmoke;
`

const Button = styled.button`
    font-size: 2.4rem;
    text-align: center;
    color: white;
    border: .125vw solid white;
    font-family: "Poppins", sans-serif;
    padding: 16px 24px;
    border-radius: 4px;
    margin: 32px 0;
    transition: all 150ms ease-in-out;

    &:hover {
        background: white;
        color: black;
    }
`