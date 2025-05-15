    import { Router } from 'express';
    import multer from 'multer';
    import { createUser, upload, authUser } from '../controllers/userController.js';
    const userRouter = Router();
   

    userRouter.post('/signup',upload.single('file'),createUser)
    userRouter.post('/login',authUser)




    export default userRouter;