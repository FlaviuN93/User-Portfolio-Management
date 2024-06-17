import { FC, useState } from 'react'
import styles from './ErrorDisplay.module.css'
import { IDefaultError } from '../../services/types'
import Button from './Button'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { getValueFromStorage } from '../../utils/functions'

interface IErrorDisplay {
	resetErrorBoundary: () => void
	error: IDefaultError
}

export const ErrorDisplay: FC<IErrorDisplay> = ({ error, resetErrorBoundary }) => {
	const [errorCount] = useState(parseInt(getValueFromStorage('errorCount', '0')))

	const handleTryAgain = async () => {
		localStorage.setItem('errorCount', JSON.stringify(errorCount + 1))

		if (errorCount > 2) {
			window.location.replace('/app/my-portfolio')
		} else if (errorCount > 4) {
			localStorage.removeItem('user')
			localStorage.removeItem('isLoggedIn')
			window.location.replace('/auth/login')
		} else resetErrorBoundary()
	}

	return (
		<main className={styles.errorBackground}>
			<div className={styles.errorBox}>
				<h2 className='mb-2'>{error.statusTitle} 🫠</h2>
				<p className='mb-4'>{error.message}</p>
				<Button icon={<ArrowUturnLeftIcon className='h-5 w-5' />} onClick={handleTryAgain} buttonText='Try again' />
			</div>
		</main>
	)
}

export default ErrorDisplay
