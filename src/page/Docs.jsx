import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import '../style/style.css'

const TOOL_BAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, 7] }],
	[{ font: [] }],
	[{ list: 'ordered' }, { list: 'bullet' }],
	['bold', 'italic', 'underline'],
	[{ color: [] }, { background: [] }],
	[{ script: 'sub' }, { script: 'super' }],
	[{ align: [] }],
	['image', 'blockquote', 'code-block'],
	['clean'],
]

function Docs() {
	const params = useParams()
	const [editorData, setEditorData] = useState('')

	useEffect(() => {
		const document = onSnapshot(
			doc(collection(db, 'docs-data'), params.id),
			res => {
				setEditorData(res.data().body)
			}
		)
		return () => document
	}, [params.id])

	function handleChange(value) {
		setEditorData(value)
	}
	useEffect(() => {
		const updateDocument = setTimeout(() => {
			updateDoc(doc(collection(db, 'docs-data'), params.id), {
				body: editorData,
			})
		}, 500)
		return () => clearTimeout(updateDocument)
	}, [editorData, params.id])
	const navigate = useNavigate()
	function goToHome() {
		navigate('/home')
	}
	// qweqwe
	return (
		<div className='Docs'>
			<button onClick={goToHome} className='backButton'>
				Back
			</button>
			<button
				onClick={() => {
					window.print()
				}}
				className='printButton'
			>
				Pint
			</button>
			<ReactQuill
				modules={{
					toolbar: TOOL_BAR_OPTIONS,
				}}
				theme='snow'
				value={editorData}
				onChange={handleChange}
			></ReactQuill>
		</div>
	)
}

export default Docs
