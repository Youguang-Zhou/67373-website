import { Empty } from 'antd'
import React, { FC } from 'react'
import fafa_robot from '../assets/images/fafa_robot.png'

const Error: FC = () => (
	<Empty
		className="fs-3"
		image={fafa_robot}
		imageStyle={{ height: '20rem' }}
		description={
			<>
				<p>服务器蚌埠住了...</p>
				<p>微博联系@青山多妩媚67373</p>
			</>
		}
	/>
)

export default Error
