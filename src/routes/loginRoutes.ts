import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/admin', (req, res) => {
    res.render('admin');
});

export default router;