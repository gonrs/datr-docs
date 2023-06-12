import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

export default function HomeModal({ setIsAdd }) {
	const { addDocs } = UserAuth()
	const [isPrivate, setIsPrivate] = useState(true)
	//
	const [isTex, setIsText] = useState(null)
	const [text, setText] = useState('')
	function handleSubmit(e) {
		e.preventDefault()
		if (text !== '' && text.length < 30) {
			addDocs(text, isPrivate)
			setIsAdd(false)
			// setText('')
		}
		if (text === '') {
			setIsText('Field placeholder')
		}
		if (text.length > 30) {
			setIsText('Title too long')
		}
	}
	//
	//

	const handleCheckboxChange = () => {
		setIsPrivate(!isPrivate)
	}
	return (
		<div className='homeModalContainer'>
			<form onSubmit={handleSubmit} className='homeAddModal'>
				<input
					type='text'
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Add a title..'
				/>
				<label style={{ display: 'flex', gap: '150px', cursor: 'pointer' }}>
					Private
					<input
						type='checkbox'
						checked={isPrivate}
						onChange={handleCheckboxChange}
					/>
				</label>
				{/* <input type='checkbox' name='remember_me' value='Privat'/> */}
				{isTex && (
					<p
						style={{
							color: 'red',
							fontSize: 15,
							textAlign: 'center',
						}}
					>
						{isTex}
					</p>
				)}
				<div className='homeFlex'>
					<button type='submite' className='homeModalAdd'>
						Add
					</button>
					<button onClick={() => setIsAdd(false)} className='homeModalCancel'>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
