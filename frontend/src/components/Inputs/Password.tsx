import { useCallback, useId, useState } from 'react'
import { TailwindClasses } from '../types'
import styles from './Password.module.css'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Tooltip from '../UI/Tooltip'

export interface PasswordProps<T extends FieldValues> {
	register: UseFormRegister<T>
	name: Path<T>
	placeholder: string
	disabled?: boolean
	label?: string
	showPasswordBtn?: boolean
	tooltipStyles?: TailwindClasses
	passwordStyles?: TailwindClasses
	error?: string
}

const Password = <T extends FieldValues>({
	disabled = false,
	placeholder,
	tooltipStyles = '',
	passwordStyles = '',
	label,
	name,
	register,
	showPasswordBtn = false,
	error,
}: PasswordProps<T>) => {
	const [showPassword, setShowPassword] = useState(false)
	const uniqueId = useId()

	const handleTogglePassword = useCallback(() => setShowPassword(!showPassword), [showPassword])
	const passwordClasses = `${styles.password} ${passwordStyles} ${error && styles.error}`

	return (
		<div className={styles.passwordContainer}>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>

			<div className='relative'>
				<input
					{...register(name)}
					className={passwordClasses}
					name={name}
					id={uniqueId}
					placeholder={placeholder}
					aria-placeholder={placeholder}
					aria-describedby={`${uniqueId}-${name}`}
					type={showPassword ? 'text' : 'password'}
					disabled={disabled}
					aria-disabled={disabled ? 'true' : 'false'}
				/>

				{showPasswordBtn && (
					<button className={styles.passwordIcon} onClick={handleTogglePassword}>
						{showPassword ? <EyeIcon className='h-6 w-6' /> : <EyeSlashIcon className='h-6 w-6' />}
					</button>
				)}

				{error && <Tooltip content={error} tooltipStyles={tooltipStyles} />}
			</div>
		</div>
	)
}

export default Password
