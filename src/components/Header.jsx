import React from 'react'
import { UserAuth } from '../context/AuthContext'

function Header() {
	const { logOut, currentUser } = UserAuth()
	console.log(currentUser.photoURL)
	return (
		<div className='header'>
			<div className='headerLogo'>
				<h1 className='headerLogoText'>
					<span> Datr</span> docs
				</h1>
			</div>
			<div className='headerFlex'>
				<img
					src={currentUser && currentUser.photoURL}
					style={{ width: 40, height: 40, borderRadius: '50%' }}
					alt=''
				/>
				<button onClick={logOut} className='headerLogOut'>
					Log Out
				</button>
			</div>
		</div>
	)
}

export default Header
