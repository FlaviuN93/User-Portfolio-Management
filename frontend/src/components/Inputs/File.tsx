import { ReactNode, useId, useRef, useEffect, useState, ChangeEvent } from 'react'
import { TailwindClasses } from '../../utils/types'
import { motion } from 'framer-motion'
import styles from './File.module.css'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'

export interface FileProps<T extends FieldValues> {
	register: UseFormRegister<T>
	onFileUpload: (file: File) => void
	name: Path<T>
	buttonText?: string
	label?: string
	icon?: ReactNode
	fileStyles?: TailwindClasses
	error?: string
	tooltipStyles?: TailwindClasses
	fileContainerStyles?: TailwindClasses
}

const File = <T extends FieldValues>({
	fileStyles = '',
	name,
	label,
	buttonText,
	icon,
	onFileUpload,
	error,
	register,
	tooltipStyles,
	fileContainerStyles,
}: FileProps<T>) => {
	const uniqueId = useId()
	const divRef = useRef<HTMLDivElement>(null)
	const [size, setSize] = useState({ width: '0', height: '0' })
	const [showTooltip, setShowTooltip] = useState(false)

	useEffect(() => {
		const width = `${divRef.current?.offsetWidth}px`
		const height = `${divRef.current?.offsetHeight}px`
		setSize({
			width,
			height,
		})
	}, [size.width, size.height])

	const isMobile = useMediaQuery('(max-width:480px)')
	const fileContainerClasses = `${styles.fileContainer} ${!label ? 'flex-row' : ''} ${fileContainerStyles ? fileContainerStyles : ''}`
	const fileClasses = `${styles.fileButton} ${fileStyles ? fileStyles : ''} ${error ? styles.error : ''} relative`

	const handleSetFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			onFileUpload(event.target.files[0])
			event.target.value = ''
		}
	}

	return (
		<div className={fileContainerClasses}>
			<label className={styles.label} htmlFor={label}>
				{label}
			</label>
			<div
				className={fileClasses}
				ref={divRef}
				role='button'
				tabIndex={0}
				onMouseOver={() => setShowTooltip(true)}
				onMouseOut={() => setShowTooltip(false)}
			>
				{icon && <span>{icon}</span>}
				<span className='font-medium'>{buttonText}</span>

				<motion.input
					animate={size}
					name={name}
					className={`absolute opacity-0 `}
					id={uniqueId}
					onChange={handleSetFile}
					ref={() => register(name)}
					aria-describedby={`${uniqueId}-${name}`}
					type='file'
				/>
				{error && (
					<Tooltip content={error} position={isMobile ? 'top' : 'right'} tooltipStyles={tooltipStyles} hoverTooltip={showTooltip} />
				)}
			</div>
		</div>
	)
}

export default File
