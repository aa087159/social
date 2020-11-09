import React, { Component } from 'react';

export class UserAccount extends Component {
	state = {
		accountModuleList: [
			{ profile: 'far fa-user-circle' },
			{ Liked: 'far fa-heart' },
			{ Settings: 'fas fa-cog' },
		],
		location: ['', '', 'account'],
	};
	render() {
		const { accountModuleList, location } = this.state;
		return (
			<div className='user-account-module'>
				<div className='user-account-module-triangle'></div>
				<ul className='user-account-module-content'>
					{accountModuleList.map((each, i) => {
						return (
							<li
								onClick={() => {
									this.props.history.push(`/${location[i]}`);
									this.props.accountModuleHandler();
								}}
								key={i}
							>
								<i className={Object.values(each)}></i>{' '}
								{Object.keys(each)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default UserAccount;
