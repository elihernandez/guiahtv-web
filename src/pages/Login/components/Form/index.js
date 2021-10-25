import React, { useState } from 'react'
import { Button } from '../../../../components/Button/index'

export function FormLogin({ onSubmit }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [check, setCheck] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit({ username, password, check })
	}

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div className="group-form">
				<label htmlFor="username" />
				<input
					type="email"
					className="username body-3"
					name="username"
					id="username"
					placeholder="Correo electrónico"
					value={username}
					autoComplete="on"
					required
					autoFocus
					data-uia="login-username-field"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="group-form">
				<label htmlFor="password" />
				<input
					type="password"
					name="password"
					id="password"
					className="password body-3"
					placeholder="Contraseña"
					autoComplete="on"
					required
					data-uia="login-password-field"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<Button type="submit" uppercase={true} color="gradient" size="full-width" classes="btn-submit-login body-3">Iniciar sesión</Button>
			<div className="group-info">
				<div className="group-rememberme row">
					<input 
						type="checkbox" 
						id="checkbox-rememberme" 
						className="input-checkbox" 
						data-uia="checkbox-rememberme"
						onChange={(e) => setCheck(e.nativeEvent.target.checked)} />
					<label htmlFor="checkbox-rememberme">
						<p className="body-3">Recordar usuario</p>
					</label>
				</div>
			</div>
		</form>
	)
}