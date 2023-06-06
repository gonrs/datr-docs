import { createContext, useContext, useEffect, useState } from 'react'
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
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
		})
		return unsubscribe
	}, [])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const UserAuth = () => {
	return useContext(AuthContext)
}
