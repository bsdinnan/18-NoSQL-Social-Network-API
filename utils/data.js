const exampleData = {
    users: [
      {
        username: 'user1',
        email: 'user1@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        thoughts: [],
        friends: [],
      },
    ],
    thoughts: [
      {
        thoughtText: 'Thought 1',
        username: 'user1',
        reactions: [
          {
            reactionBody: 'Reaction 1',
            username: 'user2',
          },
          {
            reactionBody: 'Reaction 2',
            username: 'user3',
          },
        ],
      },
      {
        thoughtText: 'Thought 2',
        username: 'user2',
        reactions: [
          {
            reactionBody: 'Reaction 3',
            username: 'user1',
          },
        ],
      },
    ],
  };
  
  module.exports = exampleData;