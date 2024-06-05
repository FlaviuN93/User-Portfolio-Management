import express from 'express'
import {
	checkResetTokenHandler,
	forgotPasswordHandler,
	loginUserHandler,
	logoutMeHandler,
	protectHandler,
	registerUserHandler,
	resetPasswordHandler,
	updatePasswordHandler,
	userRolesHandler,
} from '../controllers/authController'

const authRouter = express.Router()

authRouter.route('/register').post(registerUserHandler)
authRouter.route('/login').post(loginUserHandler)
authRouter.route('/logout').get(protectHandler, logoutMeHandler)
authRouter.route('/forgotPassword').post(forgotPasswordHandler)
authRouter.route('/changePassword').post(protectHandler, userRolesHandler('user'), updatePasswordHandler)
authRouter.route('/resetPassword/:resetToken').get(checkResetTokenHandler).patch(resetPasswordHandler)

export default authRouter
