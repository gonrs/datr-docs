import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyAf32WBbIALWMrg6Yh5pW30gH61ci3iYbw',
	authDomain: 'datr-docs.firebaseapp.com',
	projectId: 'datr-docs',
	storageBucket: 'datr-docs.appspot.com',
	messagingSenderId: '828942191467',
	appId: '1:828942191467:web:a5413151be2b9200c55a2e',
	measurementId: 'G-J6ZLNBP6MQ',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
//
export const auth = getAuth(app)
