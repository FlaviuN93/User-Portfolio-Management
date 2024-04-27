import { z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'
import { removeUserColumns } from '../utils/functions'
import { User, IDefault, IGetUserAndProjects, IUser, IUserAndProjects } from './types'

export const getUserAndProjects = async (userId: string): Promise<IGetUserAndProjects | AppError> => {
	const {
		data: userWithProjects,
		error,
		status,
	} = await supabase.from('users').select(`*, projects(*)`).eq('id', userId).single()

	if (!userWithProjects) return new AppError(404)
	if (error) return new AppError(status)

	const newUser = removeUserColumns<IUserAndProjects>(userWithProjects)
	return {
		userWithProjects: newUser,
		statusCode: 200,
		statusText: ['retrieve', 'user and projects have been sent successfully'],
	}
}

export const getUser = async (userId: string): Promise<IUser | AppError> => {
	const response = await supabase.from('users').select('*').eq('id', userId).single()
	const { data: user, error, status } = response

	if (error) return new AppError(status)
	if (!user) return new AppError(404)

	const newUser = removeUserColumns<User>(user)
	return { user: newUser, statusCode: 200, statusText: ['retrieve', 'user has been sent successfully'] }
}

export const updateUser = async (reqBody: UpdateUserType, userId: string): Promise<IUser | AppError> => {
	const response = await supabase.from('users').update(reqBody).eq('id', userId).select('*').single()
	const { data: user, error, status } = response

	if (error) return new AppError(status)
	if (!user) return new AppError(400)

	const newUser = removeUserColumns<User>(user)

	return { user: newUser, statusCode: 200, statusText: ['update', 'user has been updated successfully'] }
}

export const deleteUser = async (userId: string): Promise<IDefault | AppError> => {
	const { error, status } = await supabase.from('users').delete().eq('id', userId).select('id').single()

	if (error) return new AppError(status)

	return { statusCode: 200, statusText: ['delete', 'user has been deleted'] }
}

type UpdateUserType = z.infer<typeof updateUserSchema>
