const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const exampleData = require('./data');

mongoose.connect('mongodb://127.0.0.1:27017/socialMediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const seedData = async () => {
    try {
      const users = await User.create(exampleData.users);
      const thoughts = await Thought.create(exampleData.thoughts);
  
      for (const thought of thoughts) {
        const user = users.find((u) => u.username === thought.username);
        user.thoughts.push(thought._id);
      }

      const user1 = users.find((user) => user.username === 'user1');
      const user2 = users.find((user) => user.username === 'user2');
      user1.friends.push(user2._id);
      user2.friends.push(user1._id);
  
      const userPromises = users.map((user) => user.save());
      await Promise.all(userPromises);
  
      console.log('Seed data successfully created.');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      mongoose.disconnect();
    }
  };
  
  seedData();