import { collection, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import Loading from './Loading'
import { UserAuth } from '../context/AuthContext'

function ViewDocs() {
	const params = useParams()
	const [textData, setTextData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()
	const { currentUser } = UserAuth()
	useEffect(() => {
		const documentUnsubscribe = onSnapshot(
			doc(collection(db, 'docs-data'), params.id),
			res => {
				const data = res.data()
				if (data.author !== currentUser.email && data.private === true) {
					navigate('/error')
				} else {
					setTextData(data.body)
					setIsLoading(false)
				}
			}
		)
		return documentUnsubscribe
	}, [currentUser.email, params.id, navigate])
	return (
		<div className='ViewDocsContainer'>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div
						dangerouslySetInnerHTML={{ __html: textData }}
						className='ViewDocs'
					></div>
				</>
			)}
		</div>
	)
}

export default ViewDocs
