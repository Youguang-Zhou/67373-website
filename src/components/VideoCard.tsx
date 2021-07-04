import moment from 'moment'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { formatDuration } from '../utils/functions'
import { VodProps } from '../utils/interfaces'

interface VideoCardProps {
	type?: 'primary' | 'secondary'
	video: VodProps
}

const VideoCard: FC<VideoCardProps> = ({
	type = 'primary',
	video: { videoId, title, duration, cateName, coverURL, creationTime },
}: VideoCardProps) => (
	<Link className="select-none" to={`/watch/${videoId}`} target="_blank">
		<div
			className={`flex h-full ${
				type === 'primary'
					? 'flex-col overflow-hidden transition-all bg-white border rounded hover:shadow-md'
					: 'flex-row w-full gap-1'
			}`}
		>
			<div className={`${type === 'primary' ? '' : 'flex-shrink-0 w-1/2'}`}>
				<div className="relative">
					<div className="aspect-w-16 aspect-h-9">
						<img src={coverURL} alt={title} />
					</div>
					<span className="absolute bottom-0 right-0 px-1 m-1 text-sm text-white bg-black rounded md:text-base bg-opacity-80">
						{formatDuration(duration)}
					</span>
				</div>
			</div>
			<div className={`flex flex-col flex-1 space-y-1 md:space-y-8 p-2 ${type === 'primary' ? 'md:p-4' : ''}`}>
				<div className="flex-1">
					<h3
						className={`line-clamp-2 text-md ${
							type === 'primary' ? 'md:text-xl' : 'md:text-lg hover:text-primary'
						}`}
						title={title}
					>
						{title}
					</h3>
				</div>
				<div className="flex space-x-1 text-gray-600">
					<small className="hidden md:inline">{cateName.slice(3)}</small>
					<small className="hidden md:inline">·</small>
					<small>{moment().to(creationTime)}</small>
				</div>
			</div>
		</div>
	</Link>
)

export default VideoCard
