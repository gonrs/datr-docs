import React from 'react'
import { useNavigate } from 'react-router-dom'

function DocsItem({ value }) {
	const navigate = useNavigate()
	function handleClick(id) {
		navigate(`/document/${id}`)
	}
	function handleDel() {
		//del function
	}
	return (
		<div className='docsItem'>
			<p onClick={() => handleClick(value.id)}>{value?.title}</p>
			<button onClick={handleDel}>Del</button>
		</div>
	)
}

export default DocsItem
