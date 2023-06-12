import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import '../style/style.css'
import { UserAuth } from '../context/AuthContext'
import Loading from './Loading'

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
	const [editorData, setEditorData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const { currentUser } = UserAuth()
	const navigate = useNavigate()
	useEffect(() => {
		const documentUnsubscribe = onSnapshot(
			doc(collection(db, 'docs-data'), params.id),
			res => {
				const data = res.data()
				if (data.author !== currentUser.email) {
					navigate('/error')
				} else {
					setEditorData(data.body)
					setIsLoading(false)
				}
			}
		)
		return documentUnsubscribe
	}, [currentUser.email, params.id, navigate])

	function handleChange(value) {
		setEditorData(value)
	}

	useEffect(() => {
		const updateDocumentTimeout = setTimeout(() => {
			if (editorData !== null) {
				updateDoc(doc(collection(db, 'docs-data'), params.id), {
					body: editorData,
				})
			}
		}, 500)
		return () => clearTimeout(updateDocumentTimeout)
	}, [editorData, params.id])
	function goToHome() {
		navigate('/home')
	}

	return (
		<div className='Docs'>
			{isLoading ? (
				<Loading />
			) : (
				<>
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
				</>
			)}
		</div>
	)
}

export default Docs
