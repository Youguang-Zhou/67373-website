import React, { FC, useEffect, useState } from 'react'
import love_you from '../assets/images/love_you.png'
import Empty from '../components/Empty'
import InfiniteScroll from '../components/InfiniteScroll'
import VideoCard from '../components/VideoCard'
import useGetPlaylistRequest from '../hooks/useGetPlaylistRequest'
import { VodProps } from '../utils/interfaces'

const { REACT_APP_VOD_CATE_ID_VIDEO } = process.env

const HomePage: FC = () => {
	const [videos, setVideos] = useState<VodProps[]>([])
	const [pageNo, setPageNo] = useState(1)
	const pageSize = useState(12)[0]
	const {
		response: { requestId, videoList },
		isLoading,
		hasError,
		hasMore,
	} = useGetPlaylistRequest(REACT_APP_VOD_CATE_ID_VIDEO, pageNo, pageSize)

	useEffect(() => {
		videoList && setVideos(videos.concat(videoList.video))
	}, [requestId])

	const handleLoadMore = () => setPageNo((prevPageNo) => prevPageNo + 1)

	return (
		<main className="p-container bg-whitesmoke">
			<h1 className="text-2xl md:text-4xl">今日推荐</h1>
			<hr className="my-2 md:my-4" />
			<InfiniteScroll
				hasMore={hasMore}
				hasError={hasError}
				isLoading={isLoading}
				loadMore={handleLoadMore}
				emptyComponent={<Empty image={love_you} />}
			>
				<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
					{videos.map((video) => (
						<VideoCard key={video.videoId} video={video} />
					))}
				</section>
			</InfiniteScroll>
		</main>
	)
}

export default HomePage
