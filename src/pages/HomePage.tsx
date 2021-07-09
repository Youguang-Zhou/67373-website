import React, { FC, useEffect, useState } from 'react'
import love_you from '../assets/images/love_you.png'
import Empty from '../components/Empty'
import InfiniteScroll from '../components/InfiniteScroll'
import VideoCard from '../components/VideoCard'
import useGetVodListRequest from '../hooks/useGetVodListRequest'
import { MediaType } from '../utils/enums'
import { VodProps } from '../utils/interfaces'

const HomePage: FC = () => {
	const [videos, setVideos] = useState<VodProps[] | undefined>(undefined)
	const [pageNo, setPageNo] = useState(1)
	const pageSize = useState(12)[0]
	const {
		response: { requestId, videoList },
		isLoading,
		hasError,
		hasMore,
	} = useGetVodListRequest(MediaType.Video, pageNo, pageSize)

	useEffect(() => {
		videoList && setVideos(videos?.concat(videoList.video) || videoList.video)
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
				<section className="video-container">
					{videos?.map((video) => (
						<VideoCard key={video.videoId} video={video} openInNewTab />
					))}
				</section>
			</InfiniteScroll>
		</main>
	)
}

export default HomePage
