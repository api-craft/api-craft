import { Router } from 'express';
import { addUser,updateUser,deleteUser,getAllUsers,getUser } from './app/controllers/user.controller.js';
import { register, login, profile, logout } from './app/controllers/auth.controller.js';
import { requireAuth } from './app/middlewares/auth.middleware.js';

const router = Router();

router.get('/',(req,res) =>{
    res.send("Hello World");
})

router.get('/users',getAllUsers);
router.get('/users/:id',getUser);
router.post('/users',addUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.post('/register', register);
router.post('/login', login);
router.get('/profile', requireAuth, profile);
router.post('/logout', requireAuth, logout);

export default router;