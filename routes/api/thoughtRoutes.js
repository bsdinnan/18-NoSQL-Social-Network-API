const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughtsData = await Thought.find().populate({
      path: 'reactions',
      select: '-__v',
    });
    res.status(200).json(thoughtsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findById(req.params.id).populate({
      path: 'reactions',
      select: '-__v',
    });
    if (!thoughtData) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new thought
router.post('/', async (req, res) => {
  try {
    const thoughtData = await Thought.create(req.body);
    const userId = req.body.userId;
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thoughtData._id } },
      { new: true }
    );
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thoughtData) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndRemove(req.params.id);
    if (!thoughtData) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const userId = thoughtData.userId;
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );
    res.status(200).json({ message: 'Thought and associated data deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new reaction for a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const reactionData = await Thought.updateOne(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    );
    res.status(200).json(reactionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: reactionId } },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought or reaction not found' });
    }
    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;