import React, { Component } from 'react';
import { giveUserName } from '../components/Api';
import auth from '../components/Auth';
import { Link } from 'react-router-dom';
import LoginFollow from '../components/LoginFollow';

export class Login extends Component {
	state = {
		userName: '',
		isUserAuthenticated: false,
		unAuthAlert: false
	};

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = async (e) => {
		e.preventDefault();
		const { userName } = this.state;
		const user = await giveUserName(userName);
		if (user.message === 'Authenticated') {
			this.setState({ isUserAuthenticated: true });
		} else {
			this.setState({ unAuthAlert: true });
		}
		auth.firstLogin(user);
	};

	render() {
		return (
			<div className='min-w-screen min-h-screen bg-blue-900 flex flex-col'>
				<div className='flex justify-end flex-grow-0'>
					<Link to='/signup' className=''>
						<button className='bg-gray-100 rounded-sm mx-5 my-3 px-3 py-1 text-black font-medium'>
							Sign Up
						</button>
					</Link>
				</div>

				<div className='flex-grow flex justify-center'>
					{!this.state.isUserAuthenticated ? (
						<form
							//autoComplete='off'
							className='flex flex-col w-64 bg-transparent mx-auto my-auto'
							onSubmit={this.submitHandler}
						>
							{this.state.unAuthAlert ? (
								<p className='text-white'>
									Username Does Not Exist
								</p>
							) : null}
							<input
								type='text'
								name='userName'
								required
								placeholder='Username'
								onChange={this.changeHandler}
								className='border-gray-400 border-solid border rounded-sm my-2 p-2'
							/>
							<button
								className='bg-blue-400 rounded-sm my-2 p-2 text-white font-medium'
								type='submit'
							>
								Next
							</button>
						</form>
					) : (
						<LoginFollow
							userName={this.state.userName}
							history={this.props.history}
							changeHandler={this.changeHandler}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default Login;
