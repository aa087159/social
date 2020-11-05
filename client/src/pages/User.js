import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, followUser } from '../components/Api';

export class User extends Component {
	state = {
		strangerUser: this.props.location.pathname.slice(6),
		posts: []
	};

	componentDidMount = () => {
		const { strangerUser } = this.state;
		getUser(strangerUser).then((data) => {
			this.setState({ posts: data });
		});
	};
	follow = async () => {
		const { userName } = this.props.changeHandler;
		const { strangerUser } = this.state;
		await followUser({
			strangerUser,
			userName
		});
	};

	render() {
		const { posts } = this.state;
		const { strangerUser } = this.state;
		const { userName } = this.props.changeHandler;
		console.log(userName);
		console.log(strangerUser);

		return (
			<div>
				<p>{`This is ${strangerUser}`}</p>
				<button className='bg-gray-500' onClick={this.follow}>
					Follow
				</button>
				{posts.map((post, i) => (
					<div key={i}>
						<p>{post.title}</p>
						<p>{post.text}</p>
						<p>{post.heartCount}</p>
						<p>{post.shareCount}</p>
						<p>{post.reblogCount}</p>
						<p>{post.commentCount}</p>
						<p>{post.date}</p>
						{post.comments
							? post.comments.map((comment, i) => (
									<div key={i}>
										<p>{comment.userName}</p>
										<p>{comment.comment}</p>
									</div>
							  ))
							: null}
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	changeHandler: state.changeHandler
});

export default connect(mapStateToProps)(User);
