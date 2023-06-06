import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function PrivateRoutes({ children }) {
	const { currentUser } = UserAuth()
	if (!currentUser) {
		return <Navigate to='/' replace={true} />
	}

	return children
}

export default PrivateRoutes
