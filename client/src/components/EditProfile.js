import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../components/Api';

export class EditProfile extends Component {
	state = {
		userInfo: [],
	};

	componentDidMount = async () => {
		// console.log(this.props.changeHandler);
		// if (this.props.changeHandler.userName) {
		// 	let userInfo = await getUser(this.props.changeHandler.userName);
		// 	this.setState({ userInfo });
		// }
	};
	render() {
		//console.log(this.props.changeHandler.userName);
		return (
			<div className='tab-editProfile'>
				<div className='user-info'>
					<img src='' alt='profile-pic' />
					<div className='username'></div>
				</div>
				{/* <label for='name'>Name (4 to 8 characters):</label>

				<input
					type='text'
					id='name'
					name='name'
					required
					size='10'
				></input> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	changeHandler: state.changeHandler,
	postRedux: state.postRedux,
});

export default connect(mapStateToProps)(EditProfile);
