export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
	public: {
		Tables: {
			projects: {
				Row: {
					created_at: string
					demoURL: string
					description: string
					id: number
					imageURL: string | null
					name: string
					repositoryURL: string
					technologies: string[]
					user_id: number | null
				}
				Insert: {
					created_at?: string
					demoURL?: string
					description?: string
					id?: number
					imageURL?: string | null
					name: string
					repositoryURL?: string
					technologies: string[]
					user_id?: number | null
				}
				Update: {
					created_at?: string
					demoURL?: string
					description?: string
					id?: number
					imageURL?: string | null
					name?: string
					repositoryURL?: string
					technologies?: string[]
					user_id?: number | null
				}
				Relationships: [
					{
						foreignKeyName: 'public_settings_user_id_fkey'
						columns: ['user_id']
						isOneToOne: false
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
			technologies: {
				Row: {
					created_at: string
					id: number
					name: string
				}
				Insert: {
					created_at?: string
					id?: number
					name: string
				}
				Update: {
					created_at?: string
					id?: number
					name?: string
				}
				Relationships: []
			}
			users: {
				Row: {
					avatarImage: string
					bio: string
					coverImage: string
					created_at: string
					email: string
					fullName: string
					id: number
					jobTitle: string
					password: string
				}
				Insert: {
					avatarImage?: string
					bio?: string
					coverImage?: string
					created_at?: string
					email: string
					fullName?: string
					id?: number
					jobTitle?: string
					password: string
				}
				Update: {
					avatarImage?: string
					bio?: string
					coverImage?: string
					created_at?: string
					email?: string
					fullName?: string
					id?: number
					jobTitle?: string
					password?: string
				}
				Relationships: []
			}
		}
	}
}