const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const ThoughtData = await 
        res.status(200).json(ThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/:id', async (req, res) => {
    try {
        const ThoughtData = await 
        res.status(200).json(ThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/', async (req, res) => {
    try {
        const ThoughtData = await 
        res.status(200).json(ThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.put('/:id', async (req, res) => {
    try {
        const ThoughtData = await 
        res.status(200).json(ThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.delete('/:id', async (req, res) => {
    try {
        const ThoughtData = await 
        res.status(200).json(ThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/:id/reactions', async (req, res) => {
    try {
        const ThoughtData = await 
        res.status(200).json(ThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.delete('/:thoughtId/reactions/reactionId', async (req, res) => {
    try {
        const ThoughtData = await 
        res.status(200).json(ThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
});