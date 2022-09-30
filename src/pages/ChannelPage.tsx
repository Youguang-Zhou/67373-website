import { Favorite, LibraryMusic, MusicNote } from '@mui/icons-material'
import { Pagination, Tab, Tabs, useMediaQuery } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import banner_channel from '../assets/banner_channel.jpeg'
import cat from '../assets/cat.jpeg'
import fafa_0 from '../assets/fafa_0.png'
import fafa_1 from '../assets/fafa_1.png'
import fafa_2 from '../assets/fafa_2.png'
import fafa_3 from '../assets/fafa_3.png'
import fafa_4 from '../assets/fafa_4.png'
import fafa_5 from '../assets/fafa_5.png'
import fafa_rose from '../assets/fafa_rose.png'
import xiruisi from '../assets/xiruisi.png'
import Carousel from '../components/Carousel'
import Empty from '../components/Empty'
import VideoCard from '../components/VideoCard'
import { getGameListResults, getSearchGameResults, getVodList } from '../utils/api'
import { BREAKPOINT_SM, CATEGORIES, ORIGINALS } from '../utils/constants'
import { MediaType } from '../utils/enums'

interface TabPanelProps {
	children?: ReactNode
	value: number
	index: number
}

const { Video } = MediaType
const emptyImages = [fafa_0, fafa_1, fafa_2, fafa_3, fafa_4, fafa_5]

const ChannelPage = () => {
	const pageSize = 12
	const [pageNo, setPageNo] = useState(1)
	const [currTabIndex, setCurrTabIndex] = useState(0)
	const largeScreen = useMediaQuery(BREAKPOINT_SM)
	const [selectedTag, setSelectedTag] = useState<string | undefined>()

	const {
		data: {
			total = undefined,
			nextPage = undefined,
			videoList: { video: videos = [] } = {},
		} = {},
		isLoading,
		isError,
	} = useQuery(
		[Video, pageNo, pageSize, CATEGORIES[currTabIndex]],
		() => getVodList(Video, pageNo, pageSize, CATEGORIES[currTabIndex]),
		{ keepPreviousData: true }
	)

	const { data: gameResults } = useQuery(
		[selectedTag],
		() => getSearchGameResults(selectedTag, 1, 100),
		{
			enabled: !!selectedTag,
		}
	)

	const { data: gameList } = useQuery('gameList', () => getGameListResults())

	const handleTabIndexChange = (_: SyntheticEvent, value: number) => {
		setCurrTabIndex(value)
		setPageNo(1)
	}

	const TabPanel = ({ children, value, index }: TabPanelProps) => (
		<section className="main-container bg-whitesmoke" hidden={value !== index}>
			{isError ? (
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
									{!nextPage && <Empty image={emptyImages[currTabIndex]} />}
									{total && Math.ceil(total / pageSize) !== 1 && (
										<Pagination
											page={pageNo}
											siblingCount={largeScreen ? 2 : 1}
											count={Math.ceil(total / pageSize)}
											size={largeScreen ? 'large' : 'small'}
											className="flex justify-center pt-4 md:pt-8"
											onChange={(_, pageNo) => setPageNo(pageNo)}
											showFirstButton={largeScreen}
											showLastButton={largeScreen}
										/>
									)}
								</>
							)}
						</>
					)}
				</>
			)}
		</section>
	)

	return (
		<main>
			<img className="banner" src={banner_channel} alt="banner_channel" />
			<div className="flex items-center my-2 md:my-4 justify-evenly xl:mx-48">
				<div className="space-x-4 flex-center lg:space-x-8 xl:space-x-12">
					<img
						src={cat}
						alt="ChenYiFaer"
						className="w-16 h-16 rounded-full md:w-20 md:h-20"
					/>
					<div>
						<h1 className="text-xl md:text-2xl">
							<span>陈一发儿</span>
							<MusicNote className="text-orange-400" fontSize="small" />
						</h1>
						<small className="text-gray-600">67373万位订阅者</small>
					</div>
				</div>
				<a
					className="w-20"
					target="_blank"
					rel="noopener noreferrer"
					href="https://chenyifaer.taobao.com/"
				>
					<img className="border rounded border-primary" src={xiruisi} alt="喜瑞斯" />
				</a>
			</div>
			<Tabs
				scrollButtons
				allowScrollButtonsMobile
				value={currTabIndex}
				onChange={handleTabIndexChange}
				className="mx-auto lg:w-3/4 xl:w-2/3 2xl:w-1/2"
				variant={largeScreen ? 'fullWidth' : 'scrollable'}
			>
				<Tab label="唱歌视频" />
				<Tab label="直播回放" />
				<Tab label="直播剪辑" />
				<Tab label="茶话会视频" />
				<Tab label="游戏视频" />
				<Tab label="日常" />
			</Tabs>
			{/* 唱歌视频 */}
			<TabPanel value={currTabIndex} index={0}>
				<div className="flex items-center mb-2">
					<h2 className="text-2xl">作品集</h2>
					<Favorite className="text-red-600" />
				</div>
				<div className="flex items-baseline">
					<div className="w-full sm:w-1/2 lg:w-1/3">
						<Carousel>
							{ORIGINALS.map(({ id, name, cover }) => (
								<Link key={id} to={`/watch/${id}`} target="_blank">
									<img src={cover} alt={name} />
								</Link>
							))}
						</Carousel>
					</div>
					<img
						src={fafa_rose}
						alt="发发与玫瑰"
						className="hidden h-auto sm:block sm:w-1/2 lg:w-1/3"
					/>
				</div>
				<hr className="my-2 md:my-4" />
				<div className="flex items-center mb-2">
					<h2 className="text-2xl">歌曲集</h2>
					<LibraryMusic />
				</div>
			</TabPanel>
			{/* 油管回放 */}
			<>
				{currTabIndex == 1 && (
					<section className="pb-0 main-container bg-whitesmoke">
						{gameList &&
							gameList.split('\n').map((tag: string, idx: number) => (
								<button
									key={idx}
									className={`px-2 m-2 ${
										selectedTag == tag
											? 'rounded-full border border-orange-400'
											: ''
									}`}
									onClick={() =>
										setSelectedTag(selectedTag != tag ? tag : undefined)
									}
								>
									<span
										className={
											selectedTag == tag ? 'text-orange-400' : 'text-gray-600'
										}
									>
										{tag}
									</span>
								</button>
							))}
					</section>
				)}
				{currTabIndex == 1 && selectedTag ? (
					<section className="main-container bg-whitesmoke">
						{gameResults && gameResults.mediaList.length > 0 && (
							<section className="video-container">
								{gameResults.mediaList.map(({ video }) => (
									<VideoCard key={video.videoId} video={video} />
								))}
							</section>
						)}
					</section>
				) : (
					<TabPanel value={currTabIndex} index={1} />
				)}
			</>
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
