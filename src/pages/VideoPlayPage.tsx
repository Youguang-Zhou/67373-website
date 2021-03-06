import { SvgIconProps, useMediaQuery } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import moment from 'moment'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMeasure } from 'react-use'
import { VideoJsPlayer } from 'video.js'
import VideoCard from '../components/VideoCard'
import VideoPlayer from '../components/VideoPlayer'
import useGetRecommVideosRequest from '../hooks/useGetRecommVideosRequest'
import useGetVideoInfoRequest from '../hooks/useGetVideoInfoRequest'
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
	const [isToggleDesc, setIsToggleDesc] = useState<boolean>(false)
	const playerRef = useRef<VideoJsPlayer>()
	const [widthRef, { width }] = useMeasure<HTMLDivElement>()
	const largeScreen = useMediaQuery('(min-width: 1024px)')
	const {
		response: { requestId, videoInfo, playInfo },
		hasError,
	} = useGetVideoInfoRequest(id)
	const {
		response: { videoList: recommVideos },
		isLoading,
	} = useGetRecommVideosRequest(videoInfo?.videoId, videoInfo?.title, videoInfo?.cateName, 20)

	useEffect(() => {
		if (videoInfo && playInfo && playerRef.current) {
			// 如果是音乐分类就跳转到音乐页面
			videoInfo.cateName === '音乐' && history.push(`/music/${videoInfo.videoId}`)
			// 设置标题
			document.title = `${videoInfo.title}_67373UPUP (=^ェ^=)`
			// 设置视频源
			playerRef.current.src({ src: playInfo[0].playURL, type: 'video/mp4' })
			// 移动到顶端
			scroll(0, 0)
		}
	}, [requestId])

	useEffect(() => {
		hasError && history.push('/')
	}, [hasError])

	const handleVideoPlayerLoaded = (player: VideoJsPlayer) => (playerRef.current = player)

	return (
		<>
			{videoInfo && (
				<main className="px-4 lg:px-8 2xl:px-16 2xl:py-4">
					{/* 标题 */}
					<div style={{ width: width }}>
						<h1 className="text-2xl md:text-4xl">{videoInfo.title}</h1>
						<div className="flex my-2 space-x-4 text-gray-500">
							<span>{moment(videoInfo.creationTime).format('YYYY-MM-DD HH:mm:ss')}</span>
							<span>{videoInfo.cateName}</span>
						</div>
					</div>
					<section className="flex flex-col items-stretch justify-center space-x-0 space-y-4 lg:space-x-4 lg:space-y-0 xl:space-x-8 lg:flex-row">
						{/* 主视频 */}
						<div className="w-full lg:w-2/3" ref={widthRef}>
							<VideoPlayer onLoad={handleVideoPlayerLoaded} />
						</div>
						{/* 右边栏 */}
						<div className="w-full lg:w-1/3">
							{/* 简介 */}
							{videoInfo.description && (
								<div className="p-4 mb-4 border rounded shadow xl:mb-8">
									<SubTitle icon={<DescriptionOutlinedIcon fontSize="large" />} subtitle="简介" />
									{videoInfo.description.split('\n').map((desc, index) => {
										if (desc.startsWith('[')) {
											// 快速跳跃到固定时间点
											// 例如['hh:mm:ss童话镇', ... , 'hh:mm:ss阿婆说']
											const arr = desc.slice(1, desc.length - 1).split(',')
											return (
												<div key={index} className="relative mt-8">
													<button onClick={() => setIsToggleDesc(!isToggleDesc)}>
														<SubTitle
															icon={
																isToggleDesc ? (
																	<KeyboardArrowRightRoundedIcon />
																) : (
																	<KeyboardArrowDownRoundedIcon />
																)
															}
															subtitle="时间轴"
														/>
													</button>
													{!isToggleDesc && (
														<div className="my-2">
															{arr.map((str, index) => (
																<p key={index}>
																	<button
																		className="p-2 text-primary tabular-nums"
																		onClick={() =>
																			playerRef.current &&
																			playerRef.current.currentTime(
																				durationToSeconds(str.slice(0, 8))
																			)
																		}
																	>
																		{str.slice(0, 8)}
																	</button>
																	{str.slice(8) === '邮件环节' ? (
																		<span className="inline-flex items-center">
																			{str.slice(8)}
																			<MailOutlineIcon />
																		</span>
																	) : (
																		<span>{str.slice(8)}</span>
																	)}
																</p>
															))}
														</div>
													)}
												</div>
											)
										} else {
											// 正常的简介
											return (
												<p key={index} className="my-2">
													{desc}
												</p>
											)
										}
									})}
								</div>
							)}
							{/* 推荐视频 */}
							{isLoading ? (
								<div className="mt-8 mb-4 text-center text-primary">
									<CircularProgress color="inherit" />
								</div>
							) : (
								<section className={largeScreen ? 'flex flex-col space-y-4' : 'video-container'}>
									{recommVideos?.map((video) => (
										<VideoCard
											key={video.videoId}
											video={video}
											type={largeScreen ? 'secondary' : 'primary'}
										/>
									))}
								</section>
							)}
						</div>
					</section>
				</main>
			)}
		</>
	)
}

export default VideoPlayPage
