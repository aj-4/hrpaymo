import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

var showStyle = {
    visibility: 'visible'
}

var hideStyle = {
    display: 'none'
}

const MessagesBadge = (props) => (

    <div className="notification-div">
        <Badge
            badgeContent={props.newMessages? props.newMessages.length / 2: 0}
            secondary={true}
            badgeStyle={props.newMessages && props.newMessages.length ? showStyle : hideStyle}
        >
            <IconButton
                tooltip={props.newMessages && props.newMessages.length ? props.newMessages.length / 2 + " new messages" : "No new messages"}
                tooltipPosition="bottom-left"
                style={{ 'color': 'white' }}
            >
                <CommunicationChatBubble />
            </IconButton>
        </Badge>
    </div>
);

export default MessagesBadge;
