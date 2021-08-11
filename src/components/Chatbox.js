import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    container: {
        bottom: 0,
        position: 'fixed'
    },
    bubbleContainer: {
        width: '100%'
    },
    bubble: {
        border: '0.5px solid black',
        borderRadius: '10px',
        margin: '5px',
        padding: '10px',
        display: 'inline-block'
    }
}));

const ChatLayout = () => {
    const classes = useStyles();
    const dummyData = [
        {
            message: '1: This should be in left',
            direction: 'left'
        },
        {
            message: '2: This should be in right',
            direction: 'right'
        },
        {
            message: '3: This should be in left again',
            direction: 'left'
        }
    ];

    const chatBubbles = dummyData.map((obj, i = 0) => (
        <div className={classes.bubbleContainer}>
            <div key={i++} className={classes.bubble}>
                <div className={classes.button}>{obj.message}</div>
            </div>
        </div>
    ));
    return <div className={classes.container}>{chatBubbles}</div>;
};

export default ChatLayout;