import { Col, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlayURL } from '../api'
import VideoPlayer from '../components/VideoPlayer'

interface IPlayOptions {
	sources: Array<{ src: string; type: string }>
}

const VideoPlayPage: FC = () => {
	const [title, setTitle] = useState('')
	const [playOptions, setPlayOptions] = useState<IPlayOptions | null>(null)
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		getPlayURL(id).then(({ data }) => {
			const options = {
				poster: data.VideoBase.CoverURL,
				sources: [
					{
						src: data.PlayInfoList.PlayInfo[2].PlayURL,
						type: 'video/mp4',
					},
				],
			}
			setTitle(data.VideoBase.Title)
			setPlayOptions(options)
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
