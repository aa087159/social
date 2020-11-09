import React, { Component } from 'react';
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
		//console.log(this.props.changeHandler);
		const { userName } = this.props.changeHandler;
		await getPosts(userName).then((posts) => {
			this.props.dispatch(postRedux(posts));
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
		console.log(this.props.changeHandler);
		const icons = {
			textButton: 'fas fa-paragraph',
			photoButton: 'far fa-images',
			quoteButton: 'fas fa-quote-right',
			convoButton: 'far fa-comments',
		};
		const labels = ['text', 'photo', 'quote', 'conversation'];
		return (
			<div className='content-container'>
				<div className='content-left'>
					<div className='input-area'>
						{this.state.moduleOpen ? (
							<form onSubmit={this.onSubmit}>
								<input
									type='text'
									name='title'
									value={this.props.changeHandler.title}
									placeholder='title'
									required
									onChange={(e) =>
										this.props.dispatch(
											changeHandler({
												[e.target.name]: e.target.value,
											})
										)
									}
								/>
								<textarea
									name='text'
									cols='30'
									rows='5'
									value={this.props.changeHandler.text}
									placeholder='type something...'
									required
									onChange={(e) =>
										this.props.dispatch(
											changeHandler({
												[e.target.name]: e.target.value,
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
									className='input-type-icons'
									onClick={(e) => this.buttonClick(e)}
								>
									<i className={`${icons[icon]} fa-3x`}></i>
									<h3>{labels[i]}</h3>
								</button>
							))
						)}
					</div>

					<div className='posts-container'>
						{this.props.postRedux.length > 0
							? this.props.postRedux.map((each, i) => (
									<Post
										key={i}
										post={each}
										isText={Object.keys(each).includes(
											'text'
										)}
										newPosted={this.props.postRedux.length}
									/>
							  ))
							: null}
					</div>
				</div>
				<DashboardRight />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	changeHandler: state.changeHandler,
	postRedux: state.postRedux,
});

export default connect(mapStateToProps)(Dashboard);

{
	/* <button
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
					</button> */
}
