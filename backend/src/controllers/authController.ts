import { NextFunction, Request, Response } from 'express'
import { forgotPassword, loginUser, protect, registerUser, resetPassword } from '../models/authModel'

import { catchAsync } from '../utils/errorFunctions'
import { authSchema, forgotPasswordSchema, resetPasswordSchema } from '../services/routeSchema'
import AppError, { successMessage } from '../utils/appError'

export const registerUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)

	const response = await registerUser(email, password)
	if (response instanceof AppError) return next(response)

	const { email: userEmail, token, status, statusText } = response

	res.status(status).json({
		statusText,
		message: successMessage[status],
		user: userEmail,
		token,
	})
})

export const loginUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)
	const response = await loginUser(email, password)

	if (response instanceof AppError) return next(response)
	const { user, token, status, statusText } = response

	res.status(status).json({
		statusText: statusText,
		message: successMessage[status],
		user,
		token,
	})
})

export const forgotPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email } = forgotPasswordSchema.parse(req.body)
	const response = forgotPassword(email)
	console.log(response, 'ForgotPassword')
})

export const resetPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { password } = resetPasswordSchema.parse(req.body)
	const response = resetPassword(password)
	console.log(response, 'ResetPassword')
})

export const protectHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	let reqToken = ''
	if (req.headers.authorization?.startsWith('Bearer')) reqToken = req.headers.authorization.split(' ')[1]
	const response = await protect(reqToken)
	if (response instanceof AppError) return next(response)
	req.userId = response.userId
	next()
})
