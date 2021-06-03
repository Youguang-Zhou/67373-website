import { Empty as AntdEmpty } from 'antd'
import React, { CSSProperties, FC } from 'react'
import love_you from '../assets/images/love_you.png'

interface IEmpty {
	style?: CSSProperties
	image?: string
	height?: string
	description?: string
}

const Empty: FC<IEmpty> = ({ style, image, height, description }: IEmpty) => (
	<AntdEmpty
		style={style}
		image={image || love_you}
		imageStyle={{ height: height || '230px' }}
		description={<span style={{ fontSize: 'x-large' }}>{description || '找不到更多内容啦'}</span>}
	/>
)

export default Empty
