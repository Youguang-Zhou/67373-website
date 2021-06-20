import { Typography } from 'antd'
import moment from 'moment'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatDuration } from '../utils/functions'
import { VodProps } from '../utils/interfaces'

const Title = styled(Typography.Title)`
	font-size: calc(0.5vw + 0.8rem) !important;
`

const Card = styled.div`
	transition: box-shadow 0.3s;

	&:hover {
		box-shadow: gray 0 0 10px;
	}
`

interface VideoCardProps {
	video: VodProps
}

const VideoCard: FC<VideoCardProps> = ({
	video: { videoId, creationTime, title, duration, coverURL },
}: VideoCardProps) => (
	<div className="col">
		<Link className="text-decoration-none" to={`/watch/${videoId}`} target="_blank">
			<Card className="card h-100">
				<div className="position-relative">
					<img className="card-img-top" src={coverURL} alt={title} />
					<span className="position-absolute text-light bg-dark bottom-0 end-0 px-1 m-1 rounded">
						{formatDuration(duration)}
					</span>
				</div>
				<div className="card-body p-2 p-lg-3 pb-0">
					<Title className="fw-normal mb-0 mb-lg-2" level={5} ellipsis={{ rows: 2, tooltip: true }}>
						{title}
					</Title>
				</div>
				<div className="card-footer border-0 bg-white p-2 p-lg-3 pt-0">
					<small className="text-muted">{moment().to(creationTime)}</small>
				</div>
			</Card>
		</Link>
	</div>
)

export default VideoCard
