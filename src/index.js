import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/style.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<AuthProvider>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</AuthProvider>
	</BrowserRouter>
)
