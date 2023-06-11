import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HomeCreate from '../components/HomeCreate'
import DocsItem from '../components/DocsItem'
import HomeModal from '../components/HomeModal'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'
import LoadingElement from '../components/LoadingElement'

function Home() {
	const [docs, setDocs] = useState(null)
	const [isDocsLoading, setIsDocsLoading] = useState(true)
	const { currentUser } = UserAuth()
	useEffect(() => {
		if (currentUser) {
			onSnapshot(collection(db, 'docs-data'), res => {
				// setDocs(
				// 	res.docs.map(doc => {
				// 		return { ...doc.data(), id: doc.id }
				// 	})
				// )
				const documents = res.docs
					.map(doc => {
						if (doc.data().author === currentUser.email) {
							return { ...doc.data(), id: doc.id }
						} else {
							return null
						}
					})
					.filter(doc => doc !== null)
				setDocs(documents && documents.length > 0 ? documents : null)
				setIsDocsLoading(false)
			})
		}
	}, [currentUser])

	const [isAdd, setIsAdd] = useState(false)
	return (
		<div className='home '>
			<Header />
			<HomeCreate setIsAdd={setIsAdd} />
			<div className='homeItems '>
				<p>Ваши документы: </p>
				<div className='homeItemContainer'>
					{isDocsLoading ? (
						<LoadingElement />
					) : (
						<>
							{docs !== null ? (
								docs.map((value, index) => {
									return <DocsItem key={index} value={value} />
								})
							) : (
								<h1>Документов нет. Чтобы создать документ, нажмите на "+".</h1>
							)}
						</>
					)}
				</div>
			</div>
			{isAdd && <HomeModal setIsAdd={setIsAdd}></HomeModal>}
		</div>
	)
}

export default Home
