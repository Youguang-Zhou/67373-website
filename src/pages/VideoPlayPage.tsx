import { Col, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VideoJsPlayerOptions } from 'video.js'
import VideoPlayer from '../components/VideoPlayer'
import { getPlayURL } from '../utils/api'

const VideoPlayPage: FC = () => {
	const [title, setTitle] = useState('')
	const [playOptions, setPlayOptions] = useState<VideoJsPlayerOptions>()
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		getPlayURL(id).then(({ videoBase, playInfoList }) => {
			document.title = `${videoBase.title}_67373UPUP (=^ェ^=)`
			setTitle(videoBase.title)
			setPlayOptions({
				sources: [
					{
						src: playInfoList[0].playURL,
						type: 'video/mp4',
					},
				],
			})
		})
	}, [id])

	return (
		<main style={{ margin: '1% 3%' }}>
			<h1 style={{ fontSize: 'calc(1.5em + 1vw)' }}>{title}</h1>
			<Row>
				<Col xs={24} sm={24} md={24} lg={16} xl={16}>
					{playOptions && <VideoPlayer options={playOptions} />}
				</Col>
				<Col xs={0} sm={0} md={0} lg={8} xl={8}></Col>
			</Row>
		</main>
	)
}

export default VideoPlayPage
