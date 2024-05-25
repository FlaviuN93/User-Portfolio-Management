export interface Params {
	[key: string]: string | string[] | number | number[]
}

export interface HttpParamsType<T> {
	query?: Params
	body?: T
}

export interface IDefaultSuccess {
	message: string
}

export interface IDefaultError {
	statusTitle: string
	type: 'clientError' | 'serverError' | 'zodError' | 'NETWORK ERROR' | 'CONNECTION ISSUES'
	message: string | string[]
}

export interface IRegister extends IDefaultSuccess {
	user: { email: string }
}

export interface IUser extends IDefaultSuccess {
	user: User
}

export interface IProject extends IDefaultSuccess {
	project: Project
}

export interface Project {
	id: number
	imageURL: string
	name: string
	demoURL: string
	repositoryURL: string
	technologies: string[]
	description: string
}

export interface User {
	coverURL: string | null
	avatarURL?: string | null
	email: string
	fullName?: string
	jobTitle?: string
	linkedin?: string
	bio?: string
	projects?: Project[]
}

export interface Technology {
	id: number
	name: string
}
