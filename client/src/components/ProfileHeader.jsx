import React from 'react';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ActionFace from 'material-ui/svg-icons/action/face';

const style = {
  card: {
    position: 'relative',
    width: '100%',
    display: 'inline-block',
  },
  title: {
    fontWeight: 700,
    fontSize: '20px',
    margin: '10px'
  }
};

class ProfileHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      clickedFriendIcon: false,
      friendOnline: false
    }
  }

  componentDidMount(){
    setTimeout(this.checkIfFriendOnline.bind(this), 300);
  }

  checkIfFriendOnline() {
    this.props.socket.emit('friendsOnline',
      { msg: 'check' }
    );
    this.props.socket.on('friendsOnline', (friendNames) => {
        console.log('people online are', friendNames);
        this.setState({ friendOnline: friendNames.includes(this.props.profileInfo.username) })
    })
  }

  displayIcon(){
    return this.props.isFriend 
    ?  (<IconButton 
         className="is-friend-button"
         tooltip="unfriend"
         tooltipPosition="top-center"
         onClick={e => {
           this.setState({ clickedFriendIcon: 'rm' });
           return this.props.toggleFriend(this.props.loggedInUserId, this.props.profileInfo.userId, this.props.isFriend)
          }}         
       >
       <ActionFace />
       </IconButton>)
    : (<IconButton 
         className="add-friend-button"
         tooltip="add friend"
         tooltipPosition="top-center"    
         onClick={e => {
           this.setState({clickedFriendIcon: 'add'});
           return this.props.toggleFriend(this.props.loggedInUserId, this.props.profileInfo.userId, this.props.isFriend)
          }}      
       >
       <ContentAddCircle />
       </IconButton>)
  }

  render() {

    return (
      <Paper className='feed-container'>
        <Card>
          <CardHeader
            title={
              <div>
                <span style={style.title}>{this.props.profileInfo.fullName}</span>
                <span> ({this.props.profileInfo.username})</span>
                {
                  this.props.loggedInUserId !== this.props.profileInfo.userId &&
                  this.displayIcon()
                }
                <span style={{ paddingLeft: '50px', display: 'inlineBlock', color:'#3D95CE', fontSize: '.8rem'}}>
                  {this.state.clickedFriendIcon && this.state.clickedFriendIcon === 'add'   
                    ? 'Added Friend :)' 
                    : this.state.clickedFriendIcon && this.state.clickedFriendIcon === 'rm'
                    ? 'Removed Friend :('
                    : ''
                  }
                </span>
              </div>
            }
            subtitle={
              <div className='member-tag'>
                Member since : {moment(this.props.profileInfo.createdAt).format('MMMM Do YYYY')}
              </div>
            }
            avatar={
              <Avatar 
                style={this.state.friendOnline ? { boxShadow: '0px 0px 20px 1px green'} : { visibility: 'visible' }}
                size={100} 
                src={this.props.profileInfo.avatarUrl || '/images/no-image.gif'}
                tooltip="Chat"
                tooltipPosition="top-center"  
              />
            }
            />
            Icon here
        </Card>
      </Paper>
    );
  }
}

export default ProfileHeader;
