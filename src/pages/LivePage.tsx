import { Col, Empty, Row } from 'antd'
import React, { FC, useState } from 'react'
import { useDimensions } from 'react-dimensions-hook'
import styled from 'styled-components'
import { VideoJsPlayer } from 'video.js'
import goodnight67373 from '../assets/goodnight67373.jpg'
import LiveChatsList from '../components/LiveChatsList'
import VideoPlayer from '../components/VideoPlayer'

const ListContainer = styled(Col)`
	border: 1px solid #d9d9d9;
	border-radius: 2px;
	overflow-x: hidden;
	overflow-y: auto;
`

const playOptions = {
	sources: [
		{
			src: 'https://pull.67373upup.com/67373UPUP/ChenYiFaer.m3u8',
			type: 'application/x-mpegURL',
		},
	],
}

const LivePage: FC = () => {
	const [isLive, setIsLive] = useState(true)
	const {
		ref: playerRef,
		dimensions: { height },
	} = useDimensions()

	const handlePlayerLoad = (player: VideoJsPlayer) => player.on('error', () => setIsLive(false))

	return (
		<main className="mt-3">
			{isLive ? (
				<Row justify="center" gutter={24} style={{ margin: 0 }}>
					<Col xs={24} sm={24} md={24} lg={16} xl={16}>
						<VideoPlayer ref={playerRef} options={playOptions} onLoad={handlePlayerLoad} />
					</Col>
					<ListContainer xs={24} sm={24} md={24} lg={6} xl={6}>
						<LiveChatsList height={height} />
					</ListContainer>
				</Row>
			) : (
				<Empty
					image={goodnight67373}
					imageStyle={{ height: '15rem' }}
					description={<span style={{ fontSize: 'xx-large' }}>See you next time~</span>}
				/>
			)}
		</main>
	)
}

export default LivePage
