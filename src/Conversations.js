import React from 'react';
import Messages from './Messages';
import TextsmsIcon from '@material-ui/icons/Textsms';
import PeopleIcon from '@material-ui/icons/People';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Chatbox from './components/Chatbox';

export default class Conversations extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <ResponsiveDrawer />
                <Chatbox />
                {/* <div style={{display:"flex",}}>
                    <div style={{display:"flex",width:"80px",height:"640px",backgroundColor:"blue",flexDirection:"column",alignItems:"center"}}>
                <TextsmsIcon />
                <PeopleIcon />
                </div>
                <div><Messages /></div>
                <div>hello</div>
                </div> */}
                
            </React.Fragment>
        )
    }
}
