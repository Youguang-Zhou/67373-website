import React from 'react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from '../components/InfiniteScroll'
import VideoCard from '../components/VideoCard'
import { getVodList } from '../utils/api'
import { MediaType } from '../utils/enums'

const { Video } = MediaType

const HomePage = () => {
	const { data, isLoading, isError, hasNextPage, fetchNextPage } =
		useInfiniteQuery(
			Video,
			({ pageParam = 1 }) => getVodList(Video, pageParam, 12),
			{
				getNextPageParam: (lastPage) => lastPage.nextPage,
			}
		)

	return (
		<main className="main-container bg-whitesmoke">
			<h1 className="text-2xl md:text-4xl">今日推荐</h1>
			<hr className="my-2 md:my-4" />
			<InfiniteScroll
				hasMore={hasNextPage}
				hasError={isError}
				isLoading={isLoading}
				loadMore={fetchNextPage}
			>
				<section className="video-container">
					{data?.pages.map((videos) =>
						videos.videoList?.video.map((video) => (
							<VideoCard key={video.videoId} video={video} />
						))
					)}
				</section>
			</InfiniteScroll>
		</main>
	)
}

export default HomePage
