import { Router } from 'express';
import { addUser,updateUser,deleteUser,getAllUsers,getUser } from './app/controllers/user.controller.js';
const router = Router();

router.get('/',(req,res) =>{
    res.send("Hello World");
})

router.get('/users',getAllUsers);
router.get('/users/:id',getUser);
router.post('/users',addUser);
router.put('/users/:id',updateUser);
router.delete('/users',deleteUser);

export default router;