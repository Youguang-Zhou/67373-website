import { BackTop as AntdBackTop, Empty, Pagination as AntdPagination, Spin } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import love_you from '../assets/love_you.png'
import { getVideoList } from '../utils/api'
import { IVideo } from '../utils/interfaces'
import Avatar from './Avatar'
import VideoCard from './VideoCard'

const SpinContainer = styled.div`
	padding: 50px;
	text-align: center;
`

const BackTop = styled(AntdBackTop)`
	height: auto;
	width: auto;
	margin-bottom: 6rem;
`

const Pagination = styled(AntdPagination)`
	margin: 20px 0px;
	text-align: center;

	.ant-pagination-item-link {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

// 视频列表
const Videos = ({ videos }: { videos: IVideo[] }) => (
	<CardDeck>
		{videos.map((video) => {
			const info = {
				videoId: video.videoId,
				createTime: video.createTime,
				title: video.title,
				duration: video.duration,
				coverURL: video.coverURL,
			}
			return <VideoCard key={video.videoId} info={info} />
		})}
	</CardDeck>
)

// 没有更多视频的提示
const NoMoreVideos = ({ emptyImage }: { emptyImage?: string }) => (
	<Empty
		image={emptyImage || love_you}
		imageStyle={{ height: 230 }}
		description={<span style={{ fontSize: 'x-large' }}>没有更多视频啦</span>}
	/>
)

interface IVideoList {
	cateId?: string
	emptyImage?: string
	pagination?: boolean
}

const VideoList: FC<IVideoList> = ({ cateId, emptyImage, pagination }: IVideoList) => {
	const [videos, setVideos] = useState<IVideo[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [hasMore, setHasMore] = useState(true)
	const [total, setTotal] = useState(0)
	const [pageNo, setPageNo] = useState(1)
	const PAGE_SIZE = 12

	useEffect(() => {
		getVideoList(Number(cateId), pageNo, PAGE_SIZE)
			.then(({ requestId, total, videoList }) => {
				if (requestId) {
					if (pagination) {
						// 如果是分页模式，则直接覆盖原有的视频
						setVideos(videoList)
						if (total % PAGE_SIZE === videoList.length) {
							setHasMore(false)
						} else {
							setHasMore(true)
						}
					} else {
						// 如果是滚动模式，则把新视频加在原有的视频的后面
						setVideos(videos.concat(videoList))
					}
					setTotal(total)
				} else {
					setHasMore(false)
				}
				setIsLoading(false)
			})
			.catch(() => setHasMore(false))
	}, [pageNo])

	const handleInfiniteOnLoad = () => {
		setIsLoading(true)
		setPageNo(pageNo + 1)
	}

	return (
		<>
			{pagination ? (
				<>
					<Videos videos={videos} />
					{!hasMore && <NoMoreVideos emptyImage={emptyImage} />}
					{isLoading || (
						<Pagination
							total={total}
							current={pageNo}
							defaultPageSize={PAGE_SIZE}
							showQuickJumper={total > PAGE_SIZE}
							showSizeChanger={false}
							onChange={(pageNo) => setPageNo(pageNo)}
						/>
					)}
				</>
			) : (
				<InfiniteScroll initialLoad={false} loadMore={handleInfiniteOnLoad} hasMore={!isLoading && hasMore}>
					<Videos videos={videos} />
					{isLoading && videos.length !== total && (
						<SpinContainer>
							<Spin size="large" />
						</SpinContainer>
					)}
					{!hasMore && <NoMoreVideos emptyImage={emptyImage} />}
				</InfiniteScroll>
			)}
			<BackTop>
				<Avatar size={80} />
			</BackTop>
		</>
	)
}

export default VideoList
