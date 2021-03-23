import { Col, Typography } from 'antd'
import moment from 'moment'
import React, { FC } from 'react'
import { Card as BootStrapCard } from 'react-bootstrap'
import { useDimensions } from 'react-dimensions-hook'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { IVideo } from '../utils/interfaces'

const Card = styled(BootStrapCard)`
	margin: 15px !important;
	transition: box-shadow 0.3s;

	&:hover {
		box-shadow: gray 0 0 10px;
	}
`

const Link = styled(RouterLink)`
	color: black;
	text-decoration: none;

	&:hover {
		color: black;
		text-decoration: none;
	}
`

const Title = styled(Typography.Paragraph)`
	font-size: 1.25rem;
	height: 3rem;
	line-height: 1.5rem;
	margin-bottom: 0.5rem !important;
`

const Cover = styled(Card.Img)`
	background-color: black;
	max-height: 100%;
	max-width: 100%;
	object-fit: contain;
`

const DurationTag = styled.span`
	background-color: rgba(0, 0, 0, 0.8);
	bottom: 0;
	color: #fff;
	font-size: 0.8rem;
	margin: 1px 0px;
	padding: 0 5px;
	position: absolute;
	right: 0;
`

const { Body } = Card

interface IVideoCard {
	key?: string
	info: IVideo
}

const VideoCard: FC<IVideoCard> = ({ info }: IVideoCard) => {
	const { videoId, createTime, title, duration, coverURL } = info
	const {
		ref,
		dimensions: { width },
	} = useDimensions()

	// 格式化duration，单位是秒
	const formatDuration = (duration: number) => {
		const time = moment.utc(duration * 1000)
		return time.hour() == 0 ? time.format('mm:ss') : time.format('HH:mm:ss')
	}

	return (
		<Col xs={24} sm={12} md={12} lg={8} xl={6}>
			<Card ref={ref}>
				<Link to={`/watch/${videoId}`}>
					{/* 统一视频封面高度，由其宽度决定，按照16:9的尺寸 */}
					<div style={{ position: 'relative', height: (9 / 16) * width }}>
						<Cover variant="top" src={coverURL} />
						<DurationTag>{formatDuration(duration)}</DurationTag>
					</div>
					<Body>
						<Title ellipsis={{ rows: 2, tooltip: true }}>{title}</Title>
						<small className="text-muted">{moment().to(createTime)}</small>
					</Body>
				</Link>
			</Card>
		</Col>
	)
}

export default VideoCard
