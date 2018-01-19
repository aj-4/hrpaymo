const pg = require('./index.js').pg;

module.exports = {

  getUserInfo: (userId, callback) => {
    pg.table('users')
      .where({id: userId})
      .select('id', 'username', 'first_name', 'last_name', 'created_at', 'avatar_url')
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      });
  },


  getBalance: (userId, callback) => {
    pg.table('balance')
      .where({user_id: userId})
      .select('amount')
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      });
  },

  getProfileDataByUsername: (username) => {
    return pg.table('users')
      .where({username: username})
      .select('id', 'username', 'first_name', 'last_name', 'created_at', 'avatar_url')
      .limit(1)
  },

  getFriendsList: (userId, callback) => {
    pg.table('friendships')
    .where({from_user: userId})
    .orWhere({to_user: userId})
    .select('from_user', 'to_user', 'verified')
    .then((result) => {
      var qS = `SELECT * FROM users WHERE `
      result.forEach((entry, index) => {
        if(entry.from_user === userId) {
          index === result.length - 1 
          ? qS += `id = ${entry.to_user}` 
          : qS += `id = ${entry.to_user} OR `
        } else {
          index === result.length - 1 
          ? qS += `id = ${entry.from_user}` 
          : qS += `id = ${entry.from_user} OR `
        } 
      })
      pg.raw(qS)
      .then((result) => {
        callback(null, result.rows)
      })
    })
    .catch(err => {
      console.error('err in getFriendsList db')
    })
  },

  addFriend: (friendId, userId, callback) => {
    return pg.table('friendships')
    .insert({from_user: userId, to_user: friendId, verified: false})
    .then(data => {
      callback(null, data)
    })
    .catch(err => {
      callback(err, null);
    })
  },

  rmFriend: (friendId, userId, callback) => {
    console.log('friend id is ', friendId, 'user id is', userId);
    return pg.table('friendships')
    .where({from_user: friendId, to_user: userId})
    .orWhere({from_user: userId, to_user: friendId})    
    .del()
    .then(data => {
      callback(null, data)
    })
    .catch(err => {
      callback(err, null);
    })
  }
};