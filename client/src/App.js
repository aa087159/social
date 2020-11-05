import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Error from './pages/Error';
import { ProtectedRoute } from './components/ProtectedRoute';
import './main.css';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path='/login' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
				<ProtectedRoute path='/dashboard' exact component={Dashboard} />
				<Route path='/user/:userName' exact component={User} />
				<Route component={Error} />
			</Switch>
		</Router>
	);
};

export default App;
