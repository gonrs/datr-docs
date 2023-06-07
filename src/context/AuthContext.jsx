import { createContext, useContext, useEffect, useState } from 'react'
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import Loading from '../page/Loading'
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
	const value = {
		currentUser,
		setCurrentUser,
		signInWithGoogle,
		logOut,
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
