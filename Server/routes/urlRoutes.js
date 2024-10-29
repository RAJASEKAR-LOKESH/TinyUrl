const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Url = require('../models/urlModel');
const auth=require('../middleware/auth');
const crypto = require('crypto');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('urlCreated');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.urlCreated );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/shorten', auth, async (req, res) => {
    const { originalUrl } = req.body;
    
    try {
        const shortCode = crypto.randomBytes(4).toString('hex'); // Generates an 8-character code
        const shortenUrl = `${req.protocol}://${req.get('host')}/api/url/${shortCode}`;
        let url = await Url.findOne({ shortCode });
        if (!url) {
            url = new Url({ originalUrl, shortenUrl, shortCode });
            await url.save();
        }

        const userId = req.user._id; 
        await User.findByIdAndUpdate(userId, { $push: { urlCreated: url._id } });

        res.status(201).json({ originalUrl, shortenUrl, shortCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to handle redirection
router.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
