import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import { Button, Col, Row } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMeasure } from 'react-use'
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import VideoPlayer from '../components/VideoPlayer'
import useGetPlayInfoRequest from '../hooks/useGetPlayInfoRequest'
import { durationToSeconds } from '../utils/functions'

const VideoPlayPage: FC = () => {
	const { id } = useParams<{ id: string }>()
	const history = useHistory()
	const [title, setTitle] = useState('')
	const [playOptions, setPlayOptions] = useState<VideoJsPlayerOptions>()
	const playerRef = useRef<VideoJsPlayer>()
	const [ref, { width }] = useMeasure<HTMLDivElement>()
	const {
		response: { requestId, videoInfo, playInfo },
		hasError,
	} = useGetPlayInfoRequest(id)

	useEffect(() => {
		if (videoInfo && playInfo) {
			videoInfo.cateName === '音乐' && history.push(`/music/${videoInfo.videoId}`)
			document.title = `${videoInfo.title}_67373UPUP (=^ェ^=)`
			setTitle(videoInfo.title)
			setPlayOptions({ sources: [{ src: playInfo[0].playURL, type: 'video/mp4' }] })
		}
	}, [requestId])

	useEffect(() => {
		hasError && history.push('/')
	}, [hasError])

	const handleVideoPlayerLoaded = (player: VideoJsPlayer) => (playerRef.current = player)

	const renderVideoDescription = (description: string) =>
		description.split('\n').map((desc, index) => {
			if (desc.startsWith('[')) {
				// 快速跳跃到固定时间点
				// 例如['hh:mm:ss童话镇', ... , 'hh:mm:ss阿婆说']
				const arr = desc.slice(1, desc.length - 1).split(',')
				return arr.map((str, index) => (
					<div key={index}>
						<Button
							type="link"
							onClick={() =>
								playerRef.current && playerRef.current.currentTime(durationToSeconds(str.slice(0, 8)))
							}
						>
							{str.slice(0, 8)}
						</Button>
						<span>{str.slice(8)}</span>
					</div>
				))
			} else {
				// 正常的简介
				return <p key={index}>{desc}</p>
			}
		})

	return (
		<main style={{ margin: '0vw 2vw' }}>
			<div style={{ width: width }}>
				<h1 className="mb-3" style={{ fontSize: 'calc(0.8em + 1.2vw)' }}>
					{title}
				</h1>
			</div>
			<Row>
				<Col xs={24} sm={24} md={24} lg={16} xl={16}>
					{playOptions && (
						<div ref={ref}>
							<VideoPlayer options={playOptions} onLoad={handleVideoPlayerLoaded} />
						</div>
					)}
				</Col>
				<Col xs={24} sm={24} md={24} lg={8} xl={8}>
					{videoInfo?.description && (
						<div className="border rounded shadow p-3 mx-5">
							<Row align="middle">
								<DescriptionOutlinedIcon fontSize="large" />
								<h3 className="m-0" style={{ fontFamily: 'MFYueYuan' }}>
									简介
								</h3>
							</Row>
							<div className="mt-3">{renderVideoDescription(videoInfo.description)}</div>
						</div>
					)}
				</Col>
			</Row>
		</main>
	)
}

export default VideoPlayPage
