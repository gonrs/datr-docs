import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Home from './page/Home'
import Docs from './page/Docs'
import PrivateRoutes from './routes/PrivateRoutes'
import { UserAuth } from './context/AuthContext'

function App() {
	const { currentUser } = UserAuth()
	console.log(currentUser)
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route
				path='/home'
				element={
					<PrivateRoutes>
						<Home />
					</PrivateRoutes>
				}
			/>
			<Route
				path='/docs'
				element={
					<PrivateRoutes>
						<Docs />
					</PrivateRoutes>
				}
			/>
		</Routes>
	)
}

export default App
