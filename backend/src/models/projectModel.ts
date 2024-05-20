import { z } from 'zod'
import { createProjectSchema } from '../services/routeSchema'
import supabase from '../services/supabase'
import AppError from '../utils/appError'
import { IDefault, IProjects, IProject, ITechnologies } from './types'

export const getTechnologies = async (): Promise<ITechnologies | AppError> => {
	const { data: technologies, error, status } = await supabase.from('technologies').select('id,name')

	if (error) return new AppError(status)
	if (technologies.length === 0) return { technologies: [], statusCode: 200 }

	return {
		technologies,
		statusCode: 200,
	}
}

export const getMyProjects = async (userId: string): Promise<IProjects | AppError> => {
	const {
		data: projects,
		error,
		status,
	} = await supabase
		.from('projects')
		.select('id,imageFile,name,demoURL,repositoryURL,technologies,description')
		.eq('user_id', userId)

	if (error) return new AppError(status)
	if (projects === null || projects.length === 0) return { projects: [], statusCode: 200 }

	return { projects, statusCode: 200 }
}

export const getMyProject = async (userId: string, projectId: string): Promise<IProject | AppError> => {
	const {
		data: project,
		error,
		status,
	} = await supabase
		.from('projects')
		.select('id,imageFile,name,demoURL,repositoryURL,technologies,description')
		.eq('id', projectId)
		.eq('user_id', userId)
		.single()

	if (error) return new AppError(status)
	if (!project) return new AppError(400)

	return { project, statusCode: 200 }
}

export const createMyProject = async (reqBody: CreateProject): Promise<IDefault | AppError> => {
	const { error, status } = await supabase.from('projects').insert(reqBody)

	if (error) return new AppError(status)

	return { statusCode: 201, statusText: ['project', 'created'] }
}

export const updateMyProject = async (
	reqBody: CreateProject,
	projectId: string
): Promise<IDefault | AppError> => {
	if (reqBody.imageFile === null) {
		const { data } = await supabase.from('projects').select('imageFile').eq('id', projectId).single()
		reqBody.imageFile = data?.imageFile
	}

	const { error, status } = await supabase.from('projects').update(reqBody).eq('id', projectId)
	if (error) return new AppError(status)

	return { statusCode: 200, statusText: ['update', 'project has been updated successfully'] }
}

export const deleteMyProject = async (id: string): Promise<IDefault | AppError> => {
	const { error } = await supabase.from('projects').delete().eq('id', id).select('id').single()
	if (error) return new AppError(404, 'The project you tried to delete does not exist')

	return { statusCode: 200, statusText: ['delete', 'project has been deleted'] }
}

export type CreateProject = z.infer<typeof createProjectSchema>
