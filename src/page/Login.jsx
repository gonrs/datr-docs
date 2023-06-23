import React, { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
	const { currentUser, signInWithGoogle } = UserAuth()
	async function singIn() {
		try {
			await signInWithGoogle()
		} catch (e) {
			console.log(e)
		}
	}
	const navigate = useNavigate()
	useEffect(() => {
		if (currentUser) {
			navigate('/home')
		}
	}, [currentUser, navigate])

	return (
		<div className='login container'>
			<h1>Datr docs</h1>
			<button onClick={singIn} className='loginBtn'>
				Login with Google
			</button>
		</div>
	)
}

export default Login
