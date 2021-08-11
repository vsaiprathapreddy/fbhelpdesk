
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	chatSection: {
		width: '100%',
		height: '80vh'
	},
	headBG: {
		backgroundColor: '#e0e0e0'
	},
	borderRight500: {
		borderRight: '1px solid #e0e0e0'
	},
	messageArea: {
		height: '70vh',
		overflowY: 'auto'
	}
});

const commetsGroupedByID = (events) => {
	const comments = {};

	events.forEach((event) => {
		const { object, entry = [] } = event;
		const { changes = [] } = entry[0] || { changes: [] };
		const { field, value = {} } = changes[0] || {};
		const { created_time, from = {}, item, message, parent_id, post_id, comment_id } = value;

		if (parent_id == post_id) {
			if (Object.keys(comments).includes(comment_id)) {
				comments[comment_id].push(value)
			} else {
				comments[comment_id] = [value];
			}
		} else {
			if (Object.keys(comments).includes(parent_id)) {
				comments[parent_id].push(value)
			} else {
				comments[parent_id] = [value]
			}
		}
	})

	return comments;
}

const Chat = ({ events, setActiveEventID, activeEventID, message, setMessage, postMessage }) => {
	const classes = useStyles();
	const comments = commetsGroupedByID(events);
	const commentIDs = Object.keys(comments);

	console.log(comments, events);
	return (
		<div>
			<Grid container>
				<Grid item xs={12} >
					<Typography variant="h5" className="header-message">Chat</Typography>
				</Grid>
			</Grid>
			<Grid container component={Paper} className={classes.chatSection}>
				<Grid item xs={3} className={classes.borderRight500}>
					<List>
						{
							commentIDs.map((commentID) => {
								const commentValues = comments[commentID];
								const { created_time, from = {}, item, message } = commentValues[0] || {};

								if (item != "comment") return null;

								return (
									<ListItem style={commentID == activeEventID ? {
										backgroundColor: 'rgba(0, 0, 0, 0.04)'
									} : {}} alignItems="flex-start" button key="RemySharp" onClick={() => setActiveEventID(commentID)}>
										<ListItemIcon>
											<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
										</ListItemIcon>
										<ListItemText
											primary={from?.name || 'Unknown'}
											secondary={
												<React.Fragment>
													<Typography
														component="span"
														variant="body2"
														className={classes.inline}
														color="textPrimary"
													>
														{message}
													</Typography>
												</React.Fragment>
											}
										/>
									</ListItem>
								)
							})
						}
					</List>
				</Grid>
				<Grid item xs={9}>
					<List className={classes.messageArea}>
						{
							(comments[activeEventID] || []).reverse().map((comment) => {
								const { created_time, from = {}, item, message, parent_id, comment_id } = comment || {};
								const alignMent = from.id == "4254959437918920" ? "left" : "right";

								return (
									<ListItem key="1">
										<Grid container>
											<Grid item xs={12}>
												<ListItemText align={alignMent} primary={message}></ListItemText>
											</Grid>
											<Grid item xs={12}>
												<ListItemText align={alignMent} secondary={moment.unix(created_time).fromNow()}></ListItemText>
											</Grid>
										</Grid>
									</ListItem>
								)
							})
						}
					</List>
					<Grid container style={{ padding: '20px' }}>
						<Grid item xs={11}>
							<TextField id="outlined-basic-email" label="Type Something" fullWidth value={message} onChange={setMessage} />
						</Grid>
						<Grid xs={1} align="right">
							<Fab color="primary" aria-label="add" onClick={() => {
								const activeComment = (comments[activeEventID] || [])[0];
								const activeCommentID = activeComment?.comment_id;
								console.log(activeCommentID);
								postMessage(activeCommentID)
							}}><SendIcon /></Fab>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default Chat;