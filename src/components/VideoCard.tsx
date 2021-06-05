import { Typography } from 'antd'
import moment from 'moment'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { formatDuration } from '../utils/functions'
import { IVideo } from '../utils/interfaces'

const { Title } = Typography

const Card = styled.div`
	transition: box-shadow 0.3s;

	&:hover {
		box-shadow: gray 0 0 10px;
	}
`

const Box = styled.div`
	background-color: black;
	height: ${({ height }: { height: number }) => height}px;
`

const Cover = styled.img`
	height: inherit;
	object-fit: contain;
`

interface IVideoCard {
	key?: string
	info: IVideo
}

const VideoCard: FC<IVideoCard> = ({ info }: IVideoCard) => {
	const { videoId, creationTime, title, duration, coverURL } = info
	const [ref, { width }] = useMeasure<HTMLDivElement>()

	return (
		<div className="col">
			<Link className="text-decoration-none" to={`/watch/${videoId}`} target="_blank">
				<Card className="card h-100" ref={ref}>
					{/* 统一视频封面高度，由其宽度决定，按照16:9的尺寸 */}
					<Box className="position-relative" height={(9 / 16) * width}>
						<Cover className="card-img-top" src={coverURL} alt={title} />
						<span className="position-absolute text-light bg-dark bottom-0 end-0 px-1 m-1 rounded">
							{formatDuration(duration)}
						</span>
					</Box>
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
}

export default VideoCard
