import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePost, commentPost, getPosts } from './Api';
import { postRedux } from '../actions';

export class Post extends Component {
	state = {
		heart: false,
		commentModule: false,
		comment: '',
		shareCount: 0,
		reblogCount: 0,
	};
	// componentDidUpdate(prevProps) {
	// 	if (this.props.newPosted !== prevProps.newPosted) {
	// 		console.log('prevProps: ' + prevProps.newPosted);
	// 		console.log('current: ' + this.props.newPosted);
	// 		this.setState({ heart: false, commentModule: false });
	// 	}
	// }

	iconClick = async (e) => {
		const { userName } = this.props.changeHandler;
		const { _id } = this.props.post;
		const functionOfButton = e.currentTarget.id;

		if (functionOfButton === 'heartCount') {
			if (!this.state.heart) {
				this.setState({ heart: !this.state.heart });
				await updatePost({
					userName: userName,
					id: _id,
					update: 'plus',
				});
			} else {
				this.setState({ heart: !this.state.heart });
				await updatePost({
					userName: userName,
					id: _id,
					update: 'minus',
				});
			}
		}

		if (functionOfButton === 'commentCount') {
			this.setState({ commentModule: !this.state.commentModule });
		}
		await getPosts(userName).then((posts) => {
			this.props.dispatch(postRedux(posts));
		});
	};

	commentPost = async (e) => {
		e.preventDefault();
		const { userName } = this.props.changeHandler;
		const { _id } = this.props.post;
		await commentPost({
			userName: userName,
			id: _id,
			comment: this.state.comment,
		});
		this.setState({ comment: '' });
		await getPosts(userName).then((posts) => {
			this.props.dispatch(postRedux(posts));
		});
	};
	getSum = () => {
		let { shareCount, reblogCount } = this.state;
		const { heartCount, comments } = this.props.post;

		if (comments) {
			return heartCount + comments.length + shareCount + reblogCount;
		} else {
			return heartCount + shareCount + reblogCount;
		}
	};

	render() {
		const { title, text, heartCount, comments } = this.props.post;

		const { userName } = this.props.changeHandler;
		const gradient = {
			// borderImage: this.props.isText
			// 	? 'linear-gradient(#a6c0fe, #f68084) 0 100%'
			// 	: null,
		};
		return (
			<>
				<div className='user-info'>
					<p>{userName}</p>
				</div>

				<div className='post-content' style={gradient}>
					<div className='post-top flex '>
						<p>{this.props.post.userName}</p>
						<div className='neumorph-container ml-auto'>
							<div className=''>
								<button
									className={`btn play-pause mx-2`}
									id='heartCount'
									onClick={(e) => this.iconClick(e)}
								>
									<div className='icon-container'>
										<i
											className={`${
												this.state.heart
													? 'fas fa-heart'
													: 'far fa-heart'
											}  z-10 text-gray-400`}
										></i>
									</div>
								</button>
							</div>

							<div className=''>
								<button
									className={`btn play-pause mx-2`}
									id='commentCount'
									onClick={(e) => this.iconClick(e)}
								>
									<div className='icon-container'>
										<i className='far fa-comment-dots text-gray-400'></i>
									</div>
								</button>
							</div>

							<div className=''>
								<button
									className={`btn play-pause mx-2`}
									id='shareCount'
									onClick={(e) => this.iconClick(e)}
								>
									<div className='icon-container'>
										<i className='fas fa-share text-gray-400'></i>
									</div>
								</button>
							</div>

							<div className=''>
								<button
									className={`btn play-pause mx-2`}
									id='reblogCount'
									onClick={(e) => this.iconClick(e)}
								>
									<div className='icon-container'>
										<i className='fas fa-retweet text-gray-400'></i>
									</div>
								</button>
							</div>
						</div>
					</div>

					<p className='text-3xl font-medium mb-4'>{title}</p>
					<p className='mb-4'>{text}</p>
					<p>{`heart: ${heartCount}`}</p>
					<p>{`comment: ${comments ? comments.length : 0}`}</p>
					<p>{`share: ${this.state.shareCount}`}</p>
					<p>{`reblog: ${this.state.reblogCount}`}</p>
					<p>{`sum: ${this.getSum()}`}</p>
					<div className='comments'>
						<button className='block text-gray-500'>
							view all comments
						</button>
						{comments && comments.length > 0
							? comments.map((comment, i) => (
									<div key={i} className='flex'>
										<p className='font-medium mr-2'>
											{comment.userName}
										</p>
										<p>{comment.comment}</p>
									</div>
							  ))
							: null}
						<form onSubmit={this.commentPost}>
							<input
								type='text'
								placeholder='add a comment...'
								value={this.state.comment}
								required
								onChange={(e) => {
									this.setState({ comment: e.target.value });
								}}
							/>
							<input type='submit' value='post' />
						</form>
					</div>
					{this.state.commentModule ? <div>open</div> : null}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	changeHandler: state.changeHandler,
	postRedux: state.postRedux,
});

export default connect(mapStateToProps)(Post);
