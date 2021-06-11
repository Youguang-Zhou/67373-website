import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import love_you from '../assets/images/love_you.png'
import Empty from '../components/Empty'
import InfiniteScroll from '../components/InfiniteScroll'
import VideoCard from '../components/VideoCard'
import useGetPlaylistRequest from '../hooks/useGetPlaylistRequest'
import { IVod } from '../utils/interfaces'

const { REACT_APP_VOD_CATE_ID_VIDEO } = process.env

const Main = styled.main`
	background: whitesmoke;
	padding: 30px 5%;
`

const HomePage: FC = () => {
	const [videos, setVideos] = useState<IVod[]>([])
	const [pageNo, setPageNo] = useState(1)
	const pageSize = useState(12)[0]
	const { response, isLoading, hasError, hasMore } = useGetPlaylistRequest(
		REACT_APP_VOD_CATE_ID_VIDEO,
		pageNo,
		pageSize
	)

	useEffect(() => {
		response.videoList && setVideos(videos.concat(response.videoList.video))
	}, [response])

	const handleLoadMore = () => setPageNo((prevPageNo) => prevPageNo + 1)

	return (
		<Main>
			<h1 className="fw-normal">今日推荐</h1>
			<hr />
			<InfiniteScroll
				hasMore={hasMore}
				hasError={hasError}
				isLoading={isLoading}
				loadMore={handleLoadMore}
				emptyComponent={<Empty image={love_you} />}
			>
				<section className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
					{videos.map((video) => (
						<VideoCard key={video.videoId} video={video} />
					))}
				</section>
			</InfiniteScroll>
		</Main>
	)
}

export default HomePage
