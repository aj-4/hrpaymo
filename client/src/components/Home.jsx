import React from 'react';
import Navbar from './Navbar.jsx';
import Payment from './Payment.jsx';
import FeedContainer from './FeedContainer.jsx';
import MiniProfile from './MiniProfile.jsx';
import ContactsList from './ContactsList.jsx';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  extractView() {
    let search = this.props.location && this.props.location.search;
    return search && search.slice(search.indexOf('=') + 1);
  }

  render() {
    let orderedFeeds = [
      {
        displayLabel: 'mine',
        urlParam: 'mine',
        feedType: 'userFeed',
        data: this.props.userFeed
      },
      {
        displayLabel: 'public',
        urlParam: 'public',
        feedType: 'globalFeed',
        data: this.props.globalFeed
      }
    ];

    return (
      <div>
        <Navbar 
          socket={this.props.socket}
          isLoggedIn={this.props.isLoggedIn} 
          logUserOut={this.props.logUserOut}
          newMessages={this.props.messages}
        />
        <div className="home">
          <div className="home-leftColumn pay-feed-container">
            <Payment 
              payerId={this.props.userInfo.userId}
              refreshUserData={this.props.refreshUserData} />
            <FeedContainer 
              userId={this.props.userInfo.userId}
              base='/'
              feeds={orderedFeeds}
              loadMoreFeed={this.props.loadMoreFeed}
              view={this.extractView()}
            />
          </div>
          <div className="home-rightColumn">
            <MiniProfile 
              balance={this.props.balance}
              userInfo={this.props.userInfo}/>
            <ContactsList 
              newMessage={this.props.newMessage}
              newMessages={this.props.messages}
              newNotification={this.props.newNotification}
              clearMessagesForUser={this.props.clearMessagesForUser}
              friends={this.props.friends}
              uiAvatar={this.props.userInfo.avatarUrl || '/images/no-image.gif'}
              loggedInUsername={this.props.userInfo.username}
              socket={this.props.socket}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;