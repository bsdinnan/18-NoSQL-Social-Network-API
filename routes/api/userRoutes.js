const router = require('express').Router();
const { User, Thought } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const usersData = await User.find().populate({
      path: 'thoughts friends',
      select: '-__v',
    });
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its _id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findById(req.params.id).populate({
      path: 'thoughts friends',
      select: '-__v',
    });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a user by its _id
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a user by its _id
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.findByIdAndRemove(req.params.id);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Also, remove the user from the friends list of other users
    const userId = userData._id;
    await User.updateMany({}, { $pull: { friends: userId } });
    // Remove thoughts associated with the user
    await Thought.deleteMany({ userId: userId });
    res.status(200).json({ message: 'User and associated data deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true }
    );
    if (!updatedUserData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// REMOVE a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
    if (!updatedUserData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;