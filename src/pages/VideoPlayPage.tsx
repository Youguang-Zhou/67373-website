import { SvgIconProps } from '@material-ui/core'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import moment from 'moment'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMeasure } from 'react-use'
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import VideoPlayer from '../components/VideoPlayer'
import useGetPlayInfoRequest from '../hooks/useGetPlayInfoRequest'
import { durationToSeconds } from '../utils/functions'

interface SubTitleProps {
	icon: SvgIconProps
	subtitle: string
}

const SubTitle: FC<SubTitleProps> = ({ icon, subtitle }: SubTitleProps) => (
	<div className="flex items-center space-x-1">
		{icon}
		<h3 className="text-2xl font-MFYueYuan">{subtitle}</h3>
	</div>
)

const VideoPlayPage: FC = () => {
	const history = useHistory()
	const { id } = useParams<{ id: string }>()
	const [playOptions, setPlayOptions] = useState<VideoJsPlayerOptions>()
	const playerRef = useRef<VideoJsPlayer>()
	const [widthRef, { width }] = useMeasure<HTMLDivElement>()
	const {
		response: { requestId, videoInfo, playInfo },
		hasError,
	} = useGetPlayInfoRequest(id)

	useEffect(() => {
		if (videoInfo && playInfo) {
			videoInfo.cateName === '音乐' && history.push(`/music/${videoInfo.videoId}`)
			document.title = `${videoInfo.title}_67373UPUP (=^ェ^=)`
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
				return (
					<div className="mt-8">
						<SubTitle icon={<LabelOutlinedIcon fontSize="large" />} subtitle="时间轴" />
						<div className="my-2">
							{arr.map((str, index) => (
								<div key={index}>
									<button
										className="p-2 text-primary tabular-nums"
										onClick={() =>
											playerRef.current &&
											playerRef.current.currentTime(durationToSeconds(str.slice(0, 8)))
										}
									>
										{str.slice(0, 8)}
									</button>
									<span>{str.slice(8)}</span>
								</div>
							))}
						</div>
					</div>
				)
			} else {
				// 正常的简介
				return (
					<>
						<SubTitle icon={<DescriptionOutlinedIcon fontSize="large" />} subtitle="简介" />
						<p key={index} className="my-2">
							{desc}
						</p>
					</>
				)
			}
		})

	return (
		<>
			{videoInfo && playOptions && (
				<main className="px-4 lg:px-8 2xl:px-16 2xl:py-4">
					<div style={{ width: width }}>
						<h1 className="text-2xl md:text-4xl">{videoInfo.title}</h1>
						<div className="flex my-2 space-x-4 text-gray-500">
							<span>{moment(videoInfo.creationTime).format('YYYY-MM-DD hh:mm:ss')}</span>
							<span>{videoInfo.cateName}</span>
						</div>
					</div>
					<section className="flex flex-col items-stretch justify-center gap-4 xl:gap-8 lg:flex-row">
						<div className="w-full lg:w-2/3" ref={widthRef}>
							<VideoPlayer options={playOptions} onLoad={handleVideoPlayerLoaded} />
						</div>
						<div className="w-full lg:w-1/3">
							<div className="p-4 border rounded shadow">
								{renderVideoDescription(videoInfo.description)}
							</div>
						</div>
					</section>
				</main>
			)}
		</>
	)
}

export default VideoPlayPage
