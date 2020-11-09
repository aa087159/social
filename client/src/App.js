import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	withRouter,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Error from './pages/Error';
import Account from './pages/Account';
import { ProtectedRoute } from './components/ProtectedRoute';
import './main.css';
import Navbar from './components/Navbar';

const WithRouterNavbar = withRouter(Navbar);

const App = () => {
	return (
		<Router>
			<WithRouterNavbar />
			<Switch>
				<Route path='/login' exact component={Login} />
				<Route path='/signup' exact component={Signup} />
				<ProtectedRoute path='/dashboard' exact component={Dashboard} />
				<Route path='/account' exact component={Account} />
				<Route path='/user/:userName' exact component={User} />
				<Route component={Error} />
			</Switch>
		</Router>
	);
};

export default App;
