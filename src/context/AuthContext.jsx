import { createContext, useContext, useEffect, useState } from 'react'
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { auth, db } from '../firebase'
import Loading from '../page/Loading'
import { addDoc, collection } from 'firebase/firestore'
const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)
	function signInWithGoogle() {
		const provider = new GoogleAuthProvider()
		signInWithPopup(auth, provider)
	}
	function logOut() {
		signOut(auth)
	}
	async function addDocs(title, isPrivate) {
		addDoc(collection(db, 'docs-data'), {
			title: title,
			author: currentUser.email,
			private: isPrivate,
			body: '',
		})
	}
	const value = {
		currentUser,
		setCurrentUser,
		signInWithGoogle,
		logOut,
		addDocs,
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])
	return (
		<AuthContext.Provider value={value}>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(AuthContext)
}
