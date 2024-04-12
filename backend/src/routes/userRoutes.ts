import { getUserAndProjectsData, getUserData, updateUserData } from '../controllers/userController'
import express from 'express'

const userRouter = express.Router()

userRouter.route('/').get(getUserAndProjectsData)
userRouter.route('/:userId').get(getUserData).patch(updateUserData)

export default userRouter
