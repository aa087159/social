import React, { Component } from 'react';
import { givePasswordName } from './Api';
import auth from './Auth';

export class LoginFollow extends Component {
	state = {
		passWord: '',
		unAuthAlert: false
	};

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = async (e) => {
		e.preventDefault();
		const user = await givePasswordName({
			userName: this.props.userName,
			passWord: this.state.passWord
		});
		if (user.message === 'Authenticated') {
			auth.secondLogin(() => {
				this.props.history.push('/dashboard');
			}, user);
		} else {
			this.setState({ unAuthAlert: true });
		}
	};

	render() {
		return (
			<form
				autoComplete='off'
				onSubmit={this.submitHandler}
				className='flex flex-col w-64 bg-transparent mx-auto my-auto'
			>
				{this.state.unAuthAlert ? (
					<p className='text-white'>
						Username or password not correct
					</p>
				) : null}
				<input
					type='text'
					name='userName'
					required
					value={this.props.userName}
					placeholder='userName'
					onChange={this.props.changeHandler}
					className='border-gray-400 border-solid border rounded-sm my-2 p-2 '
				/>
				<input
					type='password'
					name='passWord'
					required
					placeholder='Password'
					onChange={this.changeHandler}
					className='border-gray-400 border-solid border rounded-sm my-2 p-2 '
				/>
				<button
					type='submit'
					className='bg-blue-400 rounded-sm my-2 p-2 text-white font-medium'
				>
					Next
				</button>
			</form>
		);
	}
}

export default LoginFollow;
