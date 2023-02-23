import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Register, Reset, Dashboard } from './components';
import { Timer } from './components/Timer';
import { Session } from './components/Session/Session';
import { Statistics } from './components/Statistics';
import NiceModal from '@ebay/nice-modal-react';

function App() {
	return (
		<div className='app'>
			<NiceModal.Provider>
				<Router>
					<Routes>
						<Route exact path='/register' element={<Register />} />
						<Route exact path='/reset' element={<Reset />} />
						<Route exact path='/dashboard' element={<Dashboard />} />
						<Route exact path='/timer' element={<Timer />} />
						<Route exact path='/new-pomodoro' element={<Session />} />
						<Route exact path='/statistics' element={<Statistics />} />
						<Route exact path='/settings' element={<Dashboard />} />
						<Route exact path='/' element={<Login />} />
					</Routes>
				</Router>
			</NiceModal.Provider>
		</div>
	);
}

export default App;
