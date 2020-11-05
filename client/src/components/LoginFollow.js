import React, { Component } from 'react';
import { givePasswordName } from './Api';
import auth from './Auth';
import { connect } from 'react-redux';
import { changeHandler, loginVerification } from '../actions';

export class LoginFollow extends Component {
	changeHandler = (e) => {
		this.props.dispatch(
			changeHandler({
				[e.target.name]: e.target.value
			})
		);
	};

	submitHandler = async (e) => {
		e.preventDefault();
		const { userName, password } = this.props.changeHandler;
		const user = await givePasswordName({
			userName: userName,
			password: password
		});

		if (user.message === 'Authenticated') {
			auth.secondLogin(() => {
				this.props.history.push('/dashboard');
			}, user);
		} else {
			this.props.dispatch(loginVerification({ unAuthAlert: true }));
		}
	};

	render() {
		const { userName } = this.props.changeHandler;
		const { unAuthAlert } = this.props.verification;
		return (
			<form
				autoComplete='on'
				onSubmit={this.submitHandler}
				className='flex flex-col w-64 bg-transparent mx-auto my-auto'
			>
				{unAuthAlert ? (
					<p className='text-white'>
						Username or password not correct
					</p>
				) : null}
				<input
					type='text'
					name='userName'
					required
					value={userName}
					placeholder='userName'
					onChange={this.changeHandler}
					className='border-gray-400 border-solid border rounded-sm my-2 p-2 '
				/>
				<input
					type='password'
					name='password'
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

const mapStateToProps = (state) => ({
	changeHandler: state.changeHandler,
	verification: state.verification
});

export default connect(mapStateToProps)(LoginFollow);
