import { useMediaQuery } from '@mui/material'
import { useDocumentTitle, useMeasure } from '@react-hookz/web'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { VideoJsPlayer } from 'video.js'
import Loading from '../components/Loading'
import VideoCard from '../components/VideoCard'
import VideoDescription from '../components/VideoDescription'
import VideoPlayer from '../components/VideoPlayer'
import { getRecommVideos, getVideoInfo } from '../utils/api'
import { BREAKPOINT_LG } from '../utils/constants'
import { DocTitleWrapper } from '../utils/functions'

const VideoPlayPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const playerRef = useRef<VideoJsPlayer>()
	const [isTheaterMode, setIsTheaterMode] = useState(false)
	const largeScreen = useMediaQuery(BREAKPOINT_LG)
	const [measure, widthRef] = useMeasure<HTMLDivElement>()
	// 获取主视频的API
	const {
		data: {
			videoInfo: {
				videoId = '',
				title = '',
				description = '',
				cateName = '',
				creationTime = '',
			} = {},
			playInfo,
		} = {},
	} = useQuery(['videoInfo', id], () => getVideoInfo(id))
	// 获取推荐视频的API
	const { data: { videoList: recommVideos } = {}, isLoading } = useQuery(
		['recomm', videoId, title, cateName],
		() => getRecommVideos(videoId, title, cateName),
		{ enabled: !!videoId }
	)

	useDocumentTitle(title, { wrapper: DocTitleWrapper })

	useEffect(() => {
		if (!playInfo || !playerRef.current) return
		// 如果是音乐分类就跳转到音乐页面
		cateName === '音乐' && navigate(`/music/${videoId}`)
		// 设置视频源
		playerRef.current.src({ src: playInfo[0].playURL, type: 'video/mp4' })
		// 滚动到顶端
		scroll(0, 0)
	}, [videoId])

	// 标题大小与标题长度相关
	const handleDisplayTitleSize = (length: number) => {
		if (length >= 100) {
			return 'text-base md:text-2xl'
		} else if (length >= 50 && length < 100) {
			return 'text-lg md:text-3xl'
		} else if (length < 50) {
			return 'text-xl md:text-4xl'
		} else {
			return 'text-base'
		}
	}

	return (
		<>
			{videoId && (
				<main className="px-4 lg:px-8 2xl:px-16 2xl:py-2">
					{/* 标题和日期 */}
					<section
						style={{ width: measure?.width, display: isTheaterMode ? 'none' : 'block' }}
					>
						<h1 className={handleDisplayTitleSize(title.length)}>{title}</h1>
						<div className="flex my-2 space-x-4 text-sm text-gray-500 sm:text-base">
							<span>{moment(creationTime).format('YYYY-MM-DD HH:mm:ss')}</span>
							<span>{cateName}</span>
						</div>
					</section>
					<section className="flex flex-col space-x-0 space-y-4 lg:space-x-8 lg:space-y-0 lg:flex-row">
						{/* 左边栏 */}
						<div className={`w-full ${isTheaterMode ? '' : 'lg:w-2/3'}`} ref={widthRef}>
							{/* 主视频 */}
							<VideoPlayer
								onLoad={(player) => (playerRef.current = player)}
								onTheaterModeToggle={() => setIsTheaterMode((prev) => !prev)}
							/>
						</div>
						{/* 右边栏 */}
						<div className={`w-full lg:w-1/3 ${isTheaterMode ? 'hidden' : 'block'}`}>
							{description && (
								<VideoDescription description={description} playerRef={playerRef} />
							)}
							{/* 推荐视频 */}
							{isLoading ? (
								<Loading />
							) : (
								<section
									className={
										largeScreen ? 'flex flex-col space-y-4' : 'video-container'
									}
								>
									{recommVideos?.map((video) => (
										<VideoCard
											key={video.videoId}
											video={video}
											type={largeScreen ? 'secondary' : 'primary'}
											newTab={false}
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
