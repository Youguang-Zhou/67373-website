import { Col, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { VideoJsPlayerOptions } from 'video.js'
import VideoPlayer from '../components/VideoPlayer'
import useGetPlayInfoRequest from '../hooks/useGetPlayInfoRequest'

const VideoPlayPage: FC = () => {
	const [title, setTitle] = useState('')
	const [playOptions, setPlayOptions] = useState<VideoJsPlayerOptions>()
	const { id } = useParams<{ id: string }>()
	const history = useHistory()
	const { response, hasError } = useGetPlayInfoRequest(id)

	useEffect(() => {
		const { videoBase, playInfoList } = response
		if (videoBase && playInfoList) {
			document.title = `${videoBase.title}_67373UPUP (=^ェ^=)`
			setTitle(videoBase.title)
			setPlayOptions({
				sources: [
					{
						src: playInfoList.playInfo[0].playURL,
						type: 'video/mp4',
					},
				],
			})
		}
	}, [response])

	useEffect(() => {
		hasError && history.push('/')
	}, [hasError])

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
