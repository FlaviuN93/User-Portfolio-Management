import Button from '../components/UI/Button'
import Avatar from '../components/UI/Avatar'
import PageNav from '../components/Containers/PageNav'
import Cover from '../components/UI/Cover'
import Plus1 from '../assets/Plus-1.svg?react'
import Plus from '../assets/Plus.svg?react'
import Trash from '../assets/Trash.svg?react'
import Text from '../components/Inputs/Text'
import { useForm } from 'react-hook-form'
import Search from '../components/Inputs/Search'
import Password from '../components/Inputs/Password'
import File from '../components/Inputs/File'
import UploadIcon from '../assets/upload.svg?react'
import ProjectCard from '../components/Containers/ProjectCard'
import {
	Dropdown,
	DropdownDivider,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../components/UI/Dropdown'
import { useId } from 'react'
import { Link } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
	const { register } = useForm()
	const uniqueId = useId()

	return (
		<div>
			<Dropdown>
				<DropdownToggle type='avatar' icon={<Plus className='h-6 w-6' />} />
				<DropdownMenu>
					<DropdownItem key={uniqueId}>
						<Avatar icon={<Plus className='h-6 w-6' />} avatarStyles='w-10 h-10' />
						<div className='text-start -mt-1'>
							<h5>Tyler Johnson</h5>
							<p className='text-xs text-gray'>tyler.johnson@gmail.com</p>
						</div>
					</DropdownItem>
					<DropdownDivider />
					<div>
						<h6 className='text-start mb-3'>Account</h6>
						<Link to={'/home'}>
							<DropdownItem>
								<UserCircleIcon className='h-6 w-6' />
								<span>Profile Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/home'}>
							<DropdownItem>
								<UserCircleIcon className='h-6 w-6' />
								<span>Project Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/home'}>
							<DropdownItem>
								<UserCircleIcon className='h-6 w-6' />
								<span>My Portofolio</span>
							</DropdownItem>
						</Link>
					</div>
					<DropdownDivider />

					<Link to={'/home'}>
						<DropdownItem>
							<UserCircleIcon className='h-6 w-6' />
							<span>Logout</span>
						</DropdownItem>
					</Link>
				</DropdownMenu>
			</Dropdown>
			<Button
				buttonText='Add'
				icon={<Plus1 />}
				type='primary'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Button
				buttonText='Add Project'
				icon={<Plus />}
				type='secondary'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Button
				buttonText='Delete Image'
				icon={<Trash />}
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>
			<Button
				buttonText='Create an account'
				type='text'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Text
				onChange={(value) => console.log(value, 'helloFromInput')}
				placeholder='Enter your job title'
				type='input'
				label='Sign In'
				name='password'
				register={register}
			/>

			<Search
				onSearch={(value) => console.log(value, 'helloFromInput')}
				placeholder='Search for values'
				name='search'
				iconPos='right'
			/>
			<Password
				onChange={(value) => console.log(value, 'helloFromInput')}
				placeholder='Enter your job title'
				label='Sign In'
				name='password'
				register={register}
				showPasswordBtn={true}
			/>

			<File
				onChange={(value) => console.log(value, 'helloFromInput')}
				label='Sign In'
				name='file'
				buttonText='Upload'
				icon={<UploadIcon />}
				register={register}
			/>

			<File
				onChange={(value) => console.log(value, 'helloFromInput')}
				label='Sign In'
				name='file'
				buttonText='Upload Image'
				icon={<UploadIcon />}
				register={register}
			/>

			<Avatar />

			<ProjectCard
				demoUrl='https://www.google.com'
				repositoryUrl='https://www.google.com'
				title='Music Player'
				description='I was Junior Front-End Developers, who are responsible for implementing visual and interactive elements that users see and interact with in a web users see and interact with in a web users see and interact with in a web'
			/>

			{/* <Menu /> */}
			<Cover />
			<PageNav />
		</div>
	)
}
