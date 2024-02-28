import { FC, MouseEvent, ReactNode } from 'react'
import { tButtonType, tSize } from './types'
import styles from './Button.module.css'

interface IProps {
	onClick: (event: MouseEvent) => void
	buttonText: string
	type?: tButtonType
	size?: tSize
	pressed?: boolean
	disabled?: boolean
	danger?: boolean
	icon?: ReactNode
	isLoading?: boolean
}

const Button: FC<IProps> = ({
	disabled = false,
	size = 'auto',
	onClick,
	icon,
	buttonText,
	danger = false,
	isLoading = false,
	pressed = false,
	type,
}) => {
	const buttonClasses = `${styles.button} ${styles[size]} ${styles[type]} ${danger && styles.danger} ${
		isLoading && styles.loading
	} 
	`

	const handleClick = (event: MouseEvent) => {
		if (!disabled && onClick) {
			pressed = true
			onClick(event)
		}
	}

	return (
		<button
			className={buttonClasses}
			disabled={disabled}
			aria-pressed={pressed ? 'true' : undefined}
			aria-disabled={disabled ? 'true' : 'false'}
			onClick={handleClick}
		>
			{isLoading ? (
				<span className={styles.spinner}></span>
			) : (
				<>
					{icon && <span className='mr-2'>{icon}</span>}
					<span>{buttonText}</span>
				</>
			)}
		</button>
	)
}

export default Button
