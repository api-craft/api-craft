import { Router } from 'express';
import { register, login, profile, logout } from './app/controllers/auth.controller.js';
import { requireAuth } from './app/middlewares/auth.middleware.js';
import User from './app/models/user.model.js';
import { createCrud } from '@api-craft/crud-router';


const router = Router();

router.get('/',(req,res) =>{
    res.send("Hello World");
})

router.use('/users',createCrud(User))
router.post('/register', register);
router.post('/login', login);
router.get('/profile', requireAuth, profile);
router.post('/logout', requireAuth, logout);

export default router;