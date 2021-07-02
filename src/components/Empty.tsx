import React, { FC } from 'react'
import fafa_robot from '../assets/images/fafa_robot.png'

interface EmptyProps {
	image?: string
	description?: string
	error?: boolean
}

const Empty: FC<EmptyProps> = ({ image, description, error }: EmptyProps) => (
	<div className="flex flex-col items-center justify-center my-4 space-y-4">
		<img className="w-32 md:w-48 lg:w-72" src={image || fafa_robot} alt="empty" />
		<span className="text-xl text-center md:text-2xl lg:text-3xl">
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
		</span>
	</div>
)

export default Empty
