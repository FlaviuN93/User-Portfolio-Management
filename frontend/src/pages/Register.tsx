import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
	return (
		<div>
			Register
			<Link to='/login'>
				<button>Log in</button>
			</Link>
		</div>
	)
}
