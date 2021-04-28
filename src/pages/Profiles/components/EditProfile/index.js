import React, { useState } from 'react'
import { Button } from '../../../../components/Button'
import './styles.css'

export function EditProfile(){
	const [nameProfile, setNameProfile] = useState('')
	const [numberPin1, setNumberPin1] = useState('')
	const [numberPin2, setNumberPin2] = useState('')
	const [numberPin3, setNumberPin3] = useState('')
	const [numberPin4, setNumberPin4] = useState('')
    
	const handleChangeNameProfile = (e) => {
		setNameProfile(e.target.value)
	} 

	const onChangeNumberPin = (numberPin, value, focus = true) => {
		switch(numberPin){
		case 1:
			setNumberPin1(value)
			hideNumberPin('numberPin1')
			if(focus) document.getElementById('numberPin2').focus()
			break
		case 2:
			setNumberPin2(value)
			hideNumberPin('numberPin2')
			if(focus) document.getElementById('numberPin3').focus()
			break
		case 3:
			setNumberPin3(value)
			hideNumberPin('numberPin3')
			if(focus) document.getElementById('numberPin4').focus()
			break
		case 4:
			hideNumberPin('numberPin4')
			setNumberPin4(value)
			break
		}
	}

	const handleChangeNumberPin = (numberPin, e) => {
		const inputType = e.nativeEvent.inputType
		if(inputType == 'deleteContentBackward'){
			onChangeNumberPin(numberPin, '', false)
		}else{
			const acceptValue = /^[0-9]+$/
			const value = e.target.value
			if(value.match(acceptValue)){
				onChangeNumberPin(numberPin, value, true)
			}
		}
	}

	const hideNumberPin = (element) => {
		document.getElementById(element).type = 'text'
		setTimeout(() => {
			document.getElementById(element).type = 'password'
		}, 200)
	}

	return (
		<div className="edit-profile-wrapper">
			<div className="list-profiles-wrapper">
				<ul className="list-profiles">
					<li className="profile-item">
						<div className="img-profile">
							<div className="thumbnail-gradient" />
							<img src="https://via.placeholder.com/150/24f355" />
							<span className="edit-icon">
								<i className="fas fa-pen"></i>
							</span>
						</div>
						<div className="group-form">
							<input
								type="text"
								className="input-name-profile body-2"
								data-uia="input-name-profile"
								value={nameProfile}
								onChange={handleChangeNameProfile}
							/>
						</div>
						<div className="group-form">
							<p className="group-form-text">Pin de seguridad</p>
							<div className="group-pin-inputs">
								<input
									type="password"
									className="input-pin body-2"
									data-uia="input-pin"
									value={numberPin1}
									maxLength = "1"
									id="numberPin1"
									onChange={(e) => handleChangeNumberPin(1, e)}
								/>
								<input
									type="password"
									className="input-pin body-2"
									data-uia="input-pin"
									maxLength="1"
									value={numberPin2}
									id="numberPin2"
									onChange={(e) => handleChangeNumberPin(2, e)}
								/>
								<input
									type="password"
									className="input-pin body-2"
									data-uia="input-pin"
									maxLength="1"
									value={numberPin3}
									id="numberPin3"
									onChange={(e) => handleChangeNumberPin(3, e)}
								/>
								<input
									type="password"
									className="input-pin body-3"
									data-uia="input-pin"
									maxLength="1"
									value={numberPin4}
									id="numberPin4"
									onChange={(e) => handleChangeNumberPin(4, e)}
								/>
							</div>
						</div>
						<div className="group-form">  
							<div className="group-content-kids">
								<input
									type="checkbox"
									className="check-content-kids"
									data-uia="check-content-kids"
								/>
								<p className="content-kids-text body-2">Esta cuenta es para niños</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div className="action-buttons">
				<Button color="outline-white" classes="button-save-profile" uppercase={true}>Guardar</Button>
				<Button color="transparent" classes="button-cancel" uppercase={true}>Cancelar</Button>
				<Button color="transparent" classes="button-delete-profile" uppercase={true}>Eliminar perfil</Button>
			</div>
		</div>
	)
}