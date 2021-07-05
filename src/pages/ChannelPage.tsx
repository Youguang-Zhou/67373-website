/* eslint-disable @typescript-eslint/no-var-requires */
import { Tab, Tabs, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import Pagination from '@material-ui/lab/Pagination'
import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cat from '../assets/images/cat.jpeg'
import channel_banner from '../assets/images/channel_banner.jpeg'
import fafa_rose from '../assets/images/fafa_rose.png'
import xiruisi from '../assets/images/xiruisi.png'
import Carousel from '../components/Carousel'
import Empty from '../components/Empty'
import VideoCard from '../components/VideoCard'
import useGetVodListRequest from '../hooks/useGetVodListRequest'
import { MediaType } from '../utils/enums'
import { VodProps } from '../utils/interfaces'

const categories = [
	process.env.REACT_APP_VOD_CATE_ID_CHANGGE,
	process.env.REACT_APP_VOD_CATE_ID_ZHIBOHUIFANG,
	process.env.REACT_APP_VOD_CATE_ID_ZHIBOJIANJI,
	process.env.REACT_APP_VOD_CATE_ID_CHAHUAHUI,
	process.env.REACT_APP_VOD_CATE_ID_YOUXI,
	process.env.REACT_APP_VOD_CATE_ID_RICHANG,
]

const originals = [
	{
		id: process.env.REACT_APP_VOD_VIDEO_ID_TONGHUAZHEN,
		name_cn: '童话镇',
		name_en: 'tonghuazhen',
	},
	{
		id: process.env.REACT_APP_VOD_VIDEO_ID_APOSHUO,
		name_cn: '阿婆说',
		name_en: 'aposhuo',
	},
	{
		id: process.env.REACT_APP_VOD_VIDEO_ID_XIANSHANGYOUCHUNQIU,
		name_cn: '弦上有春秋',
		name_en: 'xianshangyouchunqiu',
	},
]

interface TabPanelProps {
	children?: ReactNode
	value: number
	index: number
}

const ChannelPage: FC = () => {
	const [videos, setVideos] = useState<VodProps[]>([])
	const [pageNo, setPageNo] = useState<number>(1)
	const pageSize = useState<number>(12)[0]
	const [currTabIndex, setCurrTabIndex] = useState<number>(0)
	const smallScreen = useMediaQuery(useTheme().breakpoints.down('sm'))
	const {
		response: { requestId, total, videoList },
		isLoading,
		hasError,
		hasMore,
	} = useGetVodListRequest(MediaType.Video, pageNo, pageSize, categories[currTabIndex])

	useEffect(() => {
		videoList && setVideos(videoList.video)
	}, [requestId])

	const handleChange = (event: ChangeEvent<Record<string, never>>, value: number) => {
		setCurrTabIndex(value)
		setPageNo(1)
	}

	const TabPanel = ({ children, value, index }: TabPanelProps) => (
		<div className="p-container bg-whitesmoke" role="tabpanel" hidden={value !== index}>
			{hasError ? (
				<Empty error />
			) : (
				<>
					{!isLoading && (
						<>
							{value === index && (
								<>
									{children}
									<section className="video-container">
										{videos.map((video) => (
											<VideoCard key={video.videoId} video={video} />
										))}
									</section>
									{!hasMore && (
										<Empty image={require(`../assets/images/fafa_${currTabIndex}.png`).default} />
									)}
									{total && Math.ceil(total / pageSize) !== 1 && (
										<Pagination
											className="flex justify-center pt-4 md:pt-8"
											page={pageNo}
											siblingCount={smallScreen ? 1 : 2}
											count={Math.ceil(total / pageSize)}
											size={smallScreen ? 'small' : 'large'}
											onChange={(_, pageNo) => setPageNo(pageNo)}
											showFirstButton={!smallScreen}
											showLastButton={!smallScreen}
										/>
									)}
								</>
							)}
						</>
					)}
				</>
			)}
		</div>
	)

	return (
		<main>
			<img className="banner" src={channel_banner} alt="channel_banner" />
			<div className="flex items-center justify-center my-4">
				<img className="w-20 h-20 rounded-full" src={cat} alt="ChenYiFaer" />
				<div className="mx-2 sm:ml-8 md:ml-12 sm:mr-32 md:mr-72">
					<div className="flex items-center">
						<h1 className="text-xl md:text-2xl">陈一发儿</h1>
						<MusicNoteIcon className="text-yellow-500" fontSize="small" />
					</div>
					<small className="text-gray-600">673.73万位订阅者</small>
				</div>
				<a
					className="w-20 sm:w-auto"
					href="https://chenyifaer.taobao.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img className="border rounded border-primary" src={xiruisi} alt="喜瑞斯" />
				</a>
			</div>
			<Tabs
				value={currTabIndex}
				scrollButtons="on"
				centered={!smallScreen}
				variant={smallScreen ? 'scrollable' : 'standard'}
				textColor="primary"
				indicatorColor="primary"
				onChange={handleChange}
			>
				<Tab label="唱歌视频" />
				<Tab label="直播回放" />
				<Tab label="直播剪辑" />
				<Tab label="茶话会文字视频" />
				<Tab label="游戏视频" />
				<Tab label="日常" />
			</Tabs>
			{/* 唱歌视频 */}
			<TabPanel value={currTabIndex} index={0}>
				<div className="flex items-center mb-2">
					<h2 className="text-2xl">作品集</h2>
					<FavoriteIcon className="text-red-600" />
				</div>
				<div className="flex items-baseline">
					<div className="w-full sm:w-1/2 lg:w-1/3">
						<Carousel>
							{originals.map((song) => (
								<Link key={song.id} to={`/watch/${song.id}`} target="_blank">
									<img
										className="w-full"
										src={require(`../assets/images/${song.name_en}.jpeg`).default}
										alt={song.name_cn}
									/>
								</Link>
							))}
						</Carousel>
					</div>
					<img className="hidden h-auto sm:block sm:w-1/2 lg:w-1/3" src={fafa_rose} alt="发发与玫瑰" />
				</div>
				<hr className="my-2 md:my-4" />
				<div className="flex items-center mb-2">
					<h2 className="text-2xl">歌曲集</h2>
					<LibraryMusicIcon />
				</div>
			</TabPanel>
			{/* 油管回放 */}
			<TabPanel value={currTabIndex} index={1} />
			{/* 直播剪辑 */}
			<TabPanel value={currTabIndex} index={2} />
			{/* 茶话会文字视频 */}
			<TabPanel value={currTabIndex} index={3} />
			{/* 游戏视频 */}
			<TabPanel value={currTabIndex} index={4} />
			{/* 日常 */}
			<TabPanel value={currTabIndex} index={5} />
		</main>
	)
}

export default ChannelPage
