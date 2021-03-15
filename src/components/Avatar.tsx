import { Avatar as AntdAvatar } from 'antd'
import React, { FC } from 'react'
import c1f2 from '../assets/c1f2.jpeg'

interface IAvatar {
	className?: string
	size: number
	src: string
}

const Avatar: FC<IAvatar> = ({ className, size, src }: IAvatar) => (
	<AntdAvatar className={className} style={{ boxShadow: 'gray 0 0 10px' }} size={size || 50} src={src || c1f2} />
)

export default Avatar
