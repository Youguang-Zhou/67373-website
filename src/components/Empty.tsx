import React, { FC } from 'react'
import fafa_robot from '../assets/images/fafa_robot.png'

interface EmptyProps {
	image?: string
	description?: string
	error?: boolean
}

const Empty: FC<EmptyProps> = ({ image, description, error }: EmptyProps) => {
	return (
		<figure className="text-center fs-3 mt-3">
			<img src={image || fafa_robot} alt="empty" style={{ height: 'calc(8vw + 8rem)' }} />
			<figcaption>
				{description || (
					<>
						{error ? (
							<>
								<p>服务器蚌埠住了...</p>
								<p>微博联系@青山多妩媚67373</p>
							</>
						) : (
							'没有更多内容啦'
						)}
					</>
				)}
			</figcaption>
		</figure>
	)
}

export default Empty
