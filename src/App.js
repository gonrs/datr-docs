import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Home from './page/Home'
import Docs from './page/Docs'
import PrivateRoutes from './routes/PrivateRoutes'
import { UserAuth } from './context/AuthContext'
import ErrorPage from './page/ErrorPage'

function App() {
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
				path='/document/:id'
				element={
					<PrivateRoutes>
						<Docs />
					</PrivateRoutes>
				}
			/>
			<Route path='/error' element={<ErrorPage />} />
		</Routes>
	)
}

export default App
