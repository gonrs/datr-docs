import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

export default function HomeModal({ setIsAdd }) {
	const { addDocs } = UserAuth()
	//
	const [isTex, setIsText] = useState(null)
	const [text, setText] = useState('')
	function handleSubmit(e) {
		e.preventDefault()
		if (text !== '' && text.length < 30) {
			addDocs(text)
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
	return (
		<div className='homeModalContainer'>
			<form onSubmit={handleSubmit} className='homeAddModal'>
				<input
					type='text'
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Add a title..'
				/>
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
