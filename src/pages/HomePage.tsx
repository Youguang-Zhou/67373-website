import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from '../components/InfiniteScroll'
import VideoCard from '../components/VideoCard'
import { getVodList } from '../utils/api'
import { MediaType } from '../utils/enums'

const { Video } = MediaType

const HomePage = () => {
	const {
		data: { pages: allVideos } = {},
		isLoading,
		isError,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery(Video, ({ pageParam = 1 }) => getVodList(Video, pageParam), {
		getNextPageParam: ({ nextPage }) => nextPage,
	})

	const [isBirthday, setIsBirthday] = useState<boolean | undefined>()

	useEffect(() => {
		const month = new Date().getMonth() + 1
		const date = new Date().getDate()
		setIsBirthday(month == 10 && date == 13)
	}, [])

	return (
		<main className="main-container bg-whitesmoke">
			<h1 className="text-2xl md:text-4xl">
				今日推荐 <span>{isBirthday && '🎂'}</span>
			</h1>
			<hr className="mt-2 md:mt-4" />
			<div className="mb-2 md:mb-4 text-gray-700">
				{isBirthday ? (
					<span>67373代码部祝人类高质量台主、游戏高手陈一发儿生日快乐～</span>
				) : (
					<span>
						公告：最新回放请关注微博超话：陈一发儿超话。本站催更联系微博@青山多妩媚67373，谢谢大家支持：）
					</span>
				)}
			</div>
			<InfiniteScroll
				hasMore={hasNextPage}
				hasError={isError}
				isLoading={isLoading}
				loadMore={fetchNextPage}
			>
				<section className="video-container">
					{allVideos?.map(({ videoList: { video: videos } }) =>
						videos.map((video) => <VideoCard key={video.videoId} video={video} />)
					)}
				</section>
			</InfiniteScroll>
		</main>
	)
}

export default HomePage
