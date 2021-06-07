import { Typography } from 'antd'
import moment from 'moment'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatDuration } from '../utils/functions'
import { IVod } from '../utils/interfaces'

const { Title } = Typography

const Card = styled.div`
	transition: box-shadow 0.3s;

	&:hover {
		box-shadow: gray 0 0 10px;
	}
`

interface IVideoCard {
	video: IVod
}

const VideoCard: FC<IVideoCard> = ({ video: { videoId, creationTime, title, duration, coverURL } }: IVideoCard) => (
	<div className="col">
		<Link className="text-decoration-none" to={`/watch/${videoId}`} target="_blank">
			<Card className="card h-100">
				<div className="position-relative">
					<img className="card-img-top" src={coverURL} alt={title} />
					<span className="position-absolute text-light bg-dark bottom-0 end-0 px-1 m-1 rounded">
						{formatDuration(duration)}
					</span>
				</div>
				<div className="card-body pb-0">
					<Title className="fs-5 fw-normal" level={5} ellipsis={{ rows: 2, tooltip: true }}>
						{title}
					</Title>
				</div>
				<div className="card-footer border-0 bg-white">
					<small className="text-muted">{moment().to(creationTime)}</small>
				</div>
			</Card>
		</Link>
	</div>
)

export default VideoCard
