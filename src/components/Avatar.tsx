import { Avatar as AntdAvatar } from 'antd'
import React, { FC } from 'react'
import cat from '../assets/cat.jpeg'

interface IAvatar {
	className?: string
	size?: number
	src?: string
	shadow?: boolean
}

const Avatar: FC<IAvatar> = ({ className, size, src, shadow }: IAvatar) => (
	<AntdAvatar
		className={className}
		style={{ boxShadow: shadow ? 'gray 0 0 10px' : undefined }}
		size={size || 50}
		src={src || cat}
	/>
)

export default Avatar
