import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import '../style/style.css'
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
		}, 1000)
		return () => clearTimeout(updateDocument)
	}, [editorData, params.id])
	// qweqwe
	return (
		<div className='Docs'>
			<ReactQuill theme='snow' value={editorData} onChange={handleChange} />
		</div>
	)
}

export default Docs
