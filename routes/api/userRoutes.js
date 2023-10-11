const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const UserData = await 
        res.status(200).json(UserData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/:id', async (req, res) => {
    try {
        const UserData = await 
        res.status(200).json(UserData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/', async (req, res) => {
    try {
        const UserData = await 
        res.status(200).json(UserData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.put('/:id', async (req, res) => {
    try {
        const UserData = await 
        res.status(200).json(UserData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.delete('/:id', async (req, res) => {
    try {
        const UserData = await 
        res.status(200).json(UserData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/:userid/friends/:friendId', async (req, res) => {
    try {
        const UserData = await 
        res.status(200).json(UserData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.delete('/:userid/friends/:friendId', async (req, res) => {
    try {
        const UserData = await 
        res.status(200).json(UserData);
      } catch (err) {
        res.status(500).json(err);
      }
});