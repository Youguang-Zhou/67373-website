import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDuration } from '../utils/functions'

const VideoCard = ({
	type = 'primary',
	video: { videoId, title, duration, cateName, coverURL, creationTime },
	newTab = true,
}: VideoCardProps) => (
	<Link
		className="select-none"
		to={`/watch/${videoId}`}
		target={newTab ? '_blank' : '_self'}
	>
		<div
			className={`flex ${
				type === 'primary'
					? 'flex-col h-full overflow-hidden transition-all bg-white border rounded hover:shadow-md'
					: 'flex-row w-full space-x-1 hover:text-primary'
			}`}
		>
			<div
				className={`${type === 'primary' ? '' : 'flex-shrink-0 w-1/2'}`}
			>
				<div className="relative">
					<img
						className="object-cover w-full h-full aspect-video"
						src={coverURL}
						alt={title}
					/>
					<span className="absolute bottom-0 right-0 px-1 m-1 text-sm text-white bg-black rounded md:text-base bg-opacity-80">
						{formatDuration(duration)}
					</span>
				</div>
			</div>
			<div
				className={`flex flex-col flex-1 space-y-1 md:space-y-8 p-2 ${
					type === 'primary' ? 'md:p-4' : ''
				}`}
			>
				<div className="flex-1">
					<h3
						className={`line-clamp-2 text-md ${
							type === 'primary' ? 'md:text-xl' : 'md:text-lg'
						}`}
						title={title}
					>
						{title}
					</h3>
				</div>
				<div className="flex space-x-1 text-gray-600">
					<small className="hidden md:inline">
						{cateName.startsWith('视频-')
							? cateName.slice(3)
							: cateName}
					</small>
					<small className="hidden md:inline">·</small>
					<small>{moment().to(creationTime)}</small>
				</div>
			</div>
		</div>
	</Link>
)

export default VideoCard
