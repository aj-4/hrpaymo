import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatWindow from './ChatWindow.jsx';

class ContactsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            friendsOnline: []
        }
    }

    componentWillReceiveProps() {
        this.props.socket.emit("init",
            {loggedInUser: this.props.loggedInUsername}
        );
        this.checkIfFriendsOnline();
    }

    checkIfFriendsOnline() {
        this.props.socket.on('friendsOnline', (friendNames) => {
            if (this.state.friendsOnline !== friendNames) {
                this.setState({ friendsOnline: friendNames })
            }
        })
    }
    
    render() {
        return (
            <div>
                <List>
                <Subheader>Friends</Subheader>
                {
                    this.props.friends && this.props.friends.length &&
                    this.props.friends
                    .map((friend, i) => {
                        let friendOnline = this.state.friendsOnline.includes(friend.username);
                        return <ChatWindow
                                key={i} 
                                friend={friend} 
                                uiAvatar={this.props.uiAvatar}
                                socket={this.props.socket}
                                loggedInUserName={this.props.loggedInUsername}
                                online={friendOnline}
                                newMessage={this.props.newMessage}
                                newMessages={this.props.newMessages.filter(message => message.user === friend.username)}
                                clearMessagesForUser={this.props.clearMessagesForUser}
                            />;
                    })
                }
                </List>
            </div>
        );
    }
};

export default ContactsList;