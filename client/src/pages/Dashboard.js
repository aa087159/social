import React, { Component } from 'react';
import auth from '../components/Auth';
import { changeHandler, postRedux } from '../actions';
import { connect } from 'react-redux';
import { postText, getPosts } from '../components/Api';
import Post from '../components/Post';
import DashboardRight from '../components/DashboardRight';

export class Dashboard extends Component {
	state = {
		textButton: false,
		moduleOpen: false,
	};
	onSubmit = async (e) => {
		e.preventDefault();
		this.props.dispatch(
			changeHandler({
				text: ' ',
			})
		);
		this.props.dispatch(
			changeHandler({
				title: ' ',
			})
		);
		const { userName, text, title } = this.props.changeHandler;
		await postText({
			userName: userName,
			text: text,
			title: title,
		});

		await getPosts(userName).then((posts) => {
			this.props.dispatch(postRedux(posts));
		});
	};

	componentDidMount = async () => {
		const { userName } = this.props.changeHandler;
		await getPosts(userName).then((posts) => {
			this.props.dispatch(postRedux(posts));
		});
	};

	logout = () => {
		this.props.dispatch(
			changeHandler({
				userName: ' ',
			})
		);
		this.props.dispatch(
			changeHandler({
				password: ' ',
			})
		);
		auth.logout(() => {
			this.props.history.push('/login');
		});
	};

	buttonClick = (e) => {
		if (e.currentTarget.name) {
			this.setState({
				[e.currentTarget.name]: !this.state[e.currentTarget.name],
				moduleOpen: !this.state.moduleOpen,
			});
		} else {
			this.setState({
				moduleOpen: !this.state.moduleOpen,
			});
		}
	};
	render() {
		const icons = {
			textButton: 'fas fa-paragraph',
			photoButton: 'far fa-images',
			quoteButton: 'fas fa-quote-right',
			convoButton: 'far fa-comments',
		};
		const labels = ['text', 'photo', 'quote', 'conversation'];
		return (
			<div className='min-w-screen min-h-screen flex flex-col bg-white'>
				<nav className='h-16 bg-gray-300 flex justify-end p-4'>
					<button onClick={this.logout} className='mr-4'>
						Logout
					</button>
					<button
						onClick={() =>
							this.props.history.push('/user/aa0871591')
						}
					>
						go to aa0871591
					</button>
					<button
						onClick={() =>
							this.props.history.push('/user/aa087159')
						}
					>
						go to aa087159
					</button>
				</nav>
				<div className='content min-w-screen flex mx-56 mt-12'>
					<div className='left flex-grow'>
						<div className='bg-white rounded p-4'>
							{this.state.moduleOpen ? (
								<form onSubmit={this.onSubmit}>
									<input
										type='text'
										name='title'
										value={this.props.changeHandler.title}
										onChange={(e) =>
											this.props.dispatch(
												changeHandler({
													[e.target.name]:
														e.target.value,
												})
											)
										}
									/>
									<textarea
										name='text'
										cols='30'
										rows='5'
										value={this.props.changeHandler.text}
										onChange={(e) =>
											this.props.dispatch(
												changeHandler({
													[e.target.name]:
														e.target.value,
												})
											)
										}
									></textarea>
									<input type='submit' value='submit' />
									<button onClick={this.buttonClick}>
										close
									</button>
								</form>
							) : (
								Object.keys(icons).map((icon, i) => (
									<button
										key={i}
										type='button'
										name={icon}
										className='py-4 px-10 border-solid border-r border-gray-400'
										onClick={(e) => this.buttonClick(e)}
									>
										<i
											className={`${icons[icon]} fa-3x`}
										></i>
										<h3>{labels[i]}</h3>
									</button>
								))
							)}
						</div>

						<div className='posts mb-24'>
							{this.props.postRedux.length > 0
								? this.props.postRedux.map((each, i) => (
										<Post
											key={i}
											post={each}
											isText={Object.keys(each).includes(
												'text'
											)}
											newPosted={
												this.props.postRedux.length
											}
										/>
								  ))
								: null}
						</div>
					</div>
					<DashboardRight className='bg-gray-300' />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	changeHandler: state.changeHandler,
	postRedux: state.postRedux,
});

export default connect(mapStateToProps)(Dashboard);
