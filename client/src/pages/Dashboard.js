import React, { Component } from 'react';
import auth from '../components/Auth';

export class Dashboard extends Component {
	state = {
		text: ''
	};
	clickHandler = () => {
		console.log('hi');
	};
	render() {
		return (
			<div>
				<button onClick={this.clickHandler}>Text</button>
				<button onClick={this.clickHandler}>Photo</button>{' '}
				<button
					onClick={() => {
						auth.logout(() => {
							this.props.history.push('/login');
						});
					}}
				>
					Logout
				</button>
			</div>
		);
	}
}

export default Dashboard;
