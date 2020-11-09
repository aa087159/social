import React, { Component } from 'react';
import UserAccountModule from '../components/UserAccountModule';
import auth from '../components/Auth';
import { changeHandler, loginVerification, postRedux } from '../actions';
import { connect } from 'react-redux';

export class Navbar extends Component {
	state = {
		isAccountModuleOpen: false,
	};

	logout = () => {
		this.props.dispatch(
			changeHandler({
				userName: ' ',
				password: ' ',
			})
		);
		this.props.dispatch(
			changeHandler({
				password: ' ',
			})
		);
		this.props.dispatch(loginVerification({ isUserAuthenticated: false }));
		this.props.dispatch(postRedux([]));
		auth.logout(() => {
			this.props.history.push('/login');
		});
	};

	accountModuleHandler = () => {
		this.setState({ isAccountModuleOpen: !this.state.isAccountModuleOpen });
	};

	render() {
		const { isAccountModuleOpen } = this.state;
		return (
			<nav className='nav'>
				<h1>Logo</h1>
				<div className='nav-links'>
					<button onClick={this.logout}>Logout</button>
					<button
						onClick={() => {
							this.setState({
								isAccountModuleOpen: !isAccountModuleOpen,
							});
						}}
					>
						<p>Setting</p>
					</button>
					{isAccountModuleOpen ? (
						<UserAccountModule
							history={this.props.history}
							accountModuleHandler={this.accountModuleHandler}
						/>
					) : null}
				</div>
			</nav>
		);
	}
}

export default connect()(Navbar);
