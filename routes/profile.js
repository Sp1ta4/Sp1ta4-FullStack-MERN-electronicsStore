const express = require('express');
const router = express.Router();
const CheckAuth = require('../utils/CheckAuth');
const ProfileServices = require('../services/Profile.service');

router.get('/:id', CheckAuth, ProfileServices.getUser);
router.delete('/:id', CheckAuth, ProfileServices.deleteProfile);

module.exports = router;