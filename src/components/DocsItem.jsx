import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
// import { UserAuth } from '../context/AuthContext'

function DocsItem({ value }) {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	function handleClick(id) {
		navigate(`/document/${id}`)
	}
	async function handleDel() {
		setIsOpen(false)
		await deleteDoc(doc(db, 'docs-data', value.id))
	}
	function handleOpenView() {
		setIsOpen(false)
		navigate(`/document/${value.id}/view`)
	}
	function handleCopyLink() {
		navigator.clipboard.writeText(
			`http://localhost:3000/document/${value.id}/view`
		)
		setIsOpen(false)
	}
	return (
		<div className='docsItem'>
			<p onClick={() => handleClick(value.id)}>{value?.title}</p>
			<button className='docsItemBtn' onClick={() => setIsOpen(!isOpen)}>
				...
			</button>
			{isOpen && (
				<div className='openModalCon'>
					<button onClick={handleDel} className='opemModalBtn'>
						Delete
					</button>
					<button onClick={handleOpenView} className='opemModalBtn'>
						Open view
					</button>
					<button onClick={handleCopyLink} className='opemModalBtn'>
						Copy view link
					</button>
				</div>
			)}
		</div>
	)
}

export default DocsItem
