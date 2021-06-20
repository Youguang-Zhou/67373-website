import { useMediaQuery } from '@material-ui/core'
import React, { FC, ReactNode } from 'react'

interface AudioListProps {
	children?: ReactNode
}

const AudioList: FC<AudioListProps> = ({ children }: AudioListProps) => {
	const large = useMediaQuery('(min-width: 576px)')

	return (
		<>
			{large ? (
				<section className="row row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-5">{children}</section>
			) : (
				<section>{children}</section>
			)}
		</>
	)
}

export default AudioList
