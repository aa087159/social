import React, { Component } from 'react';
import EditProfile from '../components/EditProfile';

export class Account extends Component {
	state = {
		options: [
			{ 'Edit Profile': true },
			{ 'Login Activity': false },
			{ 'temp 3': false },
			{ 'temp 4': false },
			{ 'temp 5': false },
		],
		currentTab: 'Edit Profile',
	};
	clickHandler = (e) => {
		let clickedOption = e.target.getAttribute('data-value');
		let tempOptions = [...this.state.options];
		tempOptions.forEach((each) => {
			let index = tempOptions.indexOf(each);
			let keyValue = Object.keys(tempOptions[index])[0];

			if (Object.keys(each)[0] === clickedOption) {
				tempOptions[index][keyValue] = true;
			} else {
				tempOptions[index][keyValue] = false;
			}
		});
		this.setState({
			options: tempOptions,
		});
		//change tab
		this.state.options.map((each) => {
			if (Object.values(each)[0] === true) {
				this.setState({ currentTab: Object.keys(each)[0] });
			} else return;
		});
	};
	render() {
		const { options, currentTab } = this.state;
		//console.log(this.props.changeHandler);

		return (
			<div className='account-container'>
				<div className='account-options'>
					<ul>
						{options.map((each, i) => {
							return (
								<li
									data-value={Object.keys(each)}
									key={i}
									onClick={(e) => this.clickHandler(e)}
								>
									{Object.keys(each)}
								</li>
							);
						})}
					</ul>
				</div>
				<div className='account-content'>
					{currentTab === 'Edit Profile' ? <EditProfile /> : null}
					{currentTab === 'Login Activity' ? (
						<h1>Login Activity</h1>
					) : null}
				</div>
			</div>
		);
	}
}

export default Account;
