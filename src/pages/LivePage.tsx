import Typography from '@material-ui/core/Typography'
import { Col, Empty, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import goodnight67373 from '../assets/goodnight67373.jpg'
import VideoPlayer from '../components/VideoPlayer'
import { getLiveURL } from '../utils/api'

const LivePage: FC = () => {
	const [isLive, setIsLive] = useState(true)
	const [playOptions, setPlayOptions] = useState<VideoJsPlayerOptions>()

	useEffect(() => {
		getLiveURL().then(({ liveURL }) =>
			setPlayOptions({
				sources: [
					{
						src: liveURL,
						type: 'application/x-mpegURL',
					},
				],
			})
		)
	}, [])

	const handlePlayerLoad = (player: VideoJsPlayer) => player.on('error', () => setIsLive(false))

	return (
		<main className="mt-3">
			<Row justify="center">
				<Col xs={24} sm={24} md={24} lg={16} xl={16}>
					{isLive ? (
						<>
							{playOptions && <VideoPlayer options={playOptions} onLoad={handlePlayerLoad} />}
							<Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
								内部测试中...
							</Typography>
							<Typography variant="h5" gutterBottom>
								直播原地址：https://www.youtube.com/watch?v=2YkIEOFlKOk
							</Typography>
						</>
					) : (
						<Empty
							image={goodnight67373}
							imageStyle={{ height: '15rem' }}
							description={<span style={{ fontSize: 'xx-large' }}>See you next time~</span>}
						/>
					)}
				</Col>
			</Row>
		</main>
	)
}

export default LivePage
