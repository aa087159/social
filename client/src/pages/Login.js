import React, { Component } from 'react';
import { giveUserName } from '../components/Api';
import auth from '../components/Auth';
import { Link } from 'react-router-dom';
import LoginFollow from '../components/LoginFollow';
import { connect } from 'react-redux';
import { changeHandler, loginVerification } from '../actions';

export class Login extends Component {
	changeHandler = (e) => {
		this.props.dispatch(
			changeHandler({
				[e.target.name]: e.target.value
			})
		);
	};

	submitHandler = async (e) => {
		e.preventDefault();
		const { userName } = this.props.changeHandler;
		const user = await giveUserName(userName);
		if (user.message === 'Authenticated') {
			this.props.dispatch(
				loginVerification({ isUserAuthenticated: true })
			);
		} else {
			this.props.dispatch(loginVerification({ unAuthAlert: true }));
		}
		auth.firstLogin(user);
	};

	render() {
		const { isUserAuthenticated, unAuthAlert } = this.props.verification;
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
					{!isUserAuthenticated ? (
						<form
							//autoComplete='off'
							className='flex flex-col w-64 bg-transparent mx-auto my-auto'
							onSubmit={this.submitHandler}
						>
							{unAuthAlert ? (
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
							history={this.props.history}
							changeHandler={this.changeHandler}
						/>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	changeHandler: state.changeHandler,
	verification: state.verification
});

export default connect(mapStateToProps)(Login);
