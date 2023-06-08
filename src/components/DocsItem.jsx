import React from 'react'
import { useNavigate } from 'react-router-dom'

function DocsItem({ value }) {
	const navigate = useNavigate()
	function handleClick(id) {
		navigate(`/document/${id}`)
	}
	return (
		<button onClick={() => handleClick(value.id)} className='docsItem'>
			<p>{value?.title}</p>
		</button>
	)
}

export default DocsItem
