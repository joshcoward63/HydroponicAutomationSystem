// import React from 'react';
import './App.css';
import Navbar from './components/Navbar1';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Records from './pages/Records';
import Program from './pages/program';
import DeviceManager from './pages/deviceManager';
import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { isEmpty } from 'lodash';


function App() {
  const [isLoggedIn, setLoginStatus] = useState(false);

	const getAllUsers = async () => {
		const data = await axios.get('/user/authenticated/getAll');
		console.log(data);
	}


	const responseGoogle = async (response) => {
		const bodyObject = {
			authId: response.tokenId
		};
		try {
			if (isEmpty(response.errors)) {
				await axios.post('/login/user', bodyObject);
				setLoginStatus(true);
			}
		}
		catch (e) {
			console.log(e);
		}
	}


	const logout = async () => {
		try {
			await axios.get('/logout/user');
			setLoginStatus(false);
		}
		catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		async function getStatus() {
			try {
				const data = await axios.get('/user/checkLoginStatus');
				console.log(data);
				if (isEmpty(data.error)) {
					setLoginStatus(true);
				}
			}
			catch (e) {
				console.log(e);
				setLoginStatus(false);
			}
		}
		getStatus();
	}, [])

  return (
    <div className="App">
      <header className="App-header">
				<p>Google Login React/Node/Express</p>
			</header>
			<body>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					render={renderProps => (
						<button className='btn g-sigin'
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
						>
							<p>Continue with Google</p>
						</button>
					)}
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>
				<button onClick={getAllUsers}>Get All Users in db</button>
				{isLoggedIn &&
					<button onClick={logout}>Logout</button>
				}
			</body>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/program' element={<Program/>} />
          <Route path='/Records' element={<Records/>} />
          {/* <Route path='/device-manager' element={<DeviceManager/>} /> */}
          <Route path='/about' element={<About/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;