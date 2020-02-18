import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './Auth';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (
					auth.state.userAuthenticated &&
					auth.state.passwordAuthenticated
				) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: {
									from: props.location
								}
							}}
						/>
					);
				}
			}}
		/>
	);
};
