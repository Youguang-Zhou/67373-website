import { Col, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VideoJsPlayerOptions } from 'video.js'
import VideoPlayer from '../components/VideoPlayer'
import { getVideoPlayURL } from '../utils/api'

const VideoPlayPage: FC = () => {
	const [title, setTitle] = useState('')
	const [playOptions, setPlayOptions] = useState<VideoJsPlayerOptions>()
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		getVideoPlayURL(id).then(({ videoBase, playInfoList: { playInfo } }) => {
			document.title = `${videoBase.title}_67373UPUP (=^ェ^=)`
			setTitle(videoBase.title)
			setPlayOptions({
				sources: [
					{
						src: playInfo[0].playURL,
						type: 'video/mp4',
					},
				],
			})
		})
	}, [id])

	return (
		<main style={{ margin: '0vw 2vw' }}>
			<Row>
				<Col xs={24} sm={24} md={24} lg={16} xl={16}>
					<h1 style={{ fontSize: 'calc(0.8em + 1.2vw)' }}>{title}</h1>
					{playOptions && <VideoPlayer options={playOptions} />}
				</Col>
				<Col xs={0} sm={0} md={0} lg={8} xl={8}></Col>
			</Row>
		</main>
	)
}

export default VideoPlayPage
