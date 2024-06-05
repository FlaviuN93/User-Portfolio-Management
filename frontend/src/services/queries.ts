import { useMutation, useQuery } from '@tanstack/react-query'
import {
	changePassword,
	checkResetToken,
	createMyProject,
	deleteMe,
	deleteMyAvatar,
	deleteMyCover,
	deleteMyProject,
	forgotPassword,
	getMyPortfolio,
	getMyProject,
	getMyProjects,
	getTechnologies,
	getUserAndProjects,
	login,
	logout,
	register,
	resetPassword,
	updateMe,
	updateMyAvatar,
	updateMyCover,
	updateMyProject,
} from './api.requests'
import { IDefaultError, IDefaultSuccess, Technology, IUser, Project, User, ICover, IAvatar } from './types'
import { LoginType, ResetPasswordType, SignupType } from '../utils/schemas'
import { queryClient } from './queryClient'
import { updateValueFromStorage } from '../utils/functions'

// User Queries and Mutations
export const useGetMyPortfolio = () => useQuery<User, IDefaultError>({ queryKey: ['getMyPortfolio'], queryFn: getMyPortfolio })

export const useUpdateMe = () =>
	useMutation<IUser, IDefaultError, FormData>({
		mutationFn: updateMe,
	})

// export const useUpdateMyPortfolio = () => useMutation<IUser, IDefaultError, FormData>({ mutationFn: updateMyPortfolio })
export const useUpdateMyCover = () => useMutation<ICover, IDefaultError, FormData>({ mutationFn: updateMyCover })
export const useUpdateMyAvatar = () => useMutation<IAvatar, IDefaultError, FormData>({ mutationFn: updateMyAvatar })

export const useDeleteMyCover = () =>
	useMutation<IDefaultSuccess, IDefaultError>({
		mutationFn: deleteMyCover,
		onSuccess: () => {
			updateValueFromStorage({ key: 'user', keyToUpdate: 'coverURL', valueToUpdate: '' })
		},
	})
export const useDeleteMyAvatar = () =>
	useMutation<IDefaultSuccess, IDefaultError>({
		mutationFn: deleteMyAvatar,
		onSuccess: () => {
			updateValueFromStorage({ key: 'user', keyToUpdate: 'avatarURL', valueToUpdate: '' })
		},
	})

export const useDeleteMe = () =>
	useMutation<IDefaultSuccess, IDefaultError, { password: string }>({
		mutationFn: deleteMe,
		onSuccess: () => {
			window.localStorage.removeItem('user')
		},
	})

export const useGetUserAndProjects = (userId: string) =>
	useQuery<User, IDefaultError>({
		queryKey: ['getPortfolio', userId],
		queryFn: () => getUserAndProjects(userId),
	})

export const useChangePassword = () => useMutation<IUser, IDefaultError, ResetPasswordType>({ mutationFn: changePassword })

//Project Queries and Mutations

export const useGetMyProjects = () =>
	useQuery<Project[], IDefaultError>({
		queryKey: ['myProjects'],
		queryFn: getMyProjects,
	})

export const useGetMyProject = (projectId: number) =>
	useQuery<Project, IDefaultError>({
		queryKey: ['myProject', projectId],
		queryFn: () => getMyProject(projectId),
		enabled: false,
	})

export const useCreateMyProject = () =>
	useMutation<IDefaultSuccess, IDefaultError, FormData>({
		mutationFn: createMyProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useUpdateMyProject = (projectId: number) =>
	useMutation<IDefaultSuccess, IDefaultError, FormData>({
		mutationFn: (body) => updateMyProject(projectId, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useDeleteMyProject = (projectId: number) =>
	useMutation<IDefaultSuccess, IDefaultError>({
		mutationFn: () => deleteMyProject(projectId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useGetTechnologies = () =>
	useQuery<Technology[], IDefaultError>({
		queryKey: ['myProjects', 'technologies'],
		queryFn: getTechnologies,
	})

// Authentication Mutations

export const useRegister = () =>
	useMutation<IUser, IDefaultError, SignupType>({
		mutationFn: register,
	})

export const useLogin = () =>
	useMutation<IUser, IDefaultError, LoginType>({
		mutationFn: login,
	})

export const useLogout = () => useMutation({ mutationFn: logout })
export const useForgotPassword = () => useMutation<IDefaultSuccess, IDefaultError, { email: string }>({ mutationFn: forgotPassword })

export const useResetPassword = (resetToken: string | undefined) =>
	useMutation<IDefaultSuccess, IDefaultError, ResetPasswordType>({
		mutationFn: (body) => resetPassword(resetToken, body),
	})
export const useCheckResetToken = (resetToken: string | undefined) =>
	useQuery<undefined, IDefaultError>({ queryKey: ['resetToken'], queryFn: () => checkResetToken(resetToken), enabled: true })
