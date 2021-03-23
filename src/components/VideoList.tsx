import { BackTop as AntdBackTop, Empty, Spin } from 'antd'
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
`

interface IVideoList {
	cateId?: string
	emptyImage?: string
}

const VideoList: FC<IVideoList> = ({ cateId, emptyImage }: IVideoList) => {
	const [videos, setVideos] = useState<IVideo[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [hasMore, setHasMore] = useState(true)
	const [total, setTotal] = useState(0)
	const [pageNo, setPageNo] = useState(1)
	const PAGE_SIZE = 12

	useEffect(() => {
		getVideoList(Number(cateId), pageNo, PAGE_SIZE)
			.then((res) => {
				if (!res) {
					setHasMore(false)
				} else {
					setVideos(videos.concat(res.videoList))
					setTotal(res.total)
				}
				setIsLoading(false)
			})
			.catch(() => {
				console.log('没有更多视频了')
				setHasMore(false)
			})
	}, [pageNo])

	const handleInfiniteOnLoad = () => {
		setIsLoading(true)
		setPageNo(pageNo + 1)
	}

	const addEmptyCard = (totalVideos: number) => {
		// totalVideos % 4 取余得出最后一行卡片的个数
		// 再用4减去最后一行卡片个数得出需要填充隐形卡片的个数
		// PAGE_SIZE取12的目的是无论一行展示1个/2个/3个/4个视频，都可以被12整除
		const num = 4 - (totalVideos % 4)
		const arr = []
		for (let i = 0; i < num; i++) {
			arr.push(<VideoCard disable info={{ id: '', createTime: '', title: '', duration: 0, cover: '' }} />)
		}
		return arr
	}

	return (
		<InfiniteScroll initialLoad={false} loadMore={handleInfiniteOnLoad} hasMore={!isLoading && hasMore}>
			{/* 视频列表 */}
			<CardDeck>
				{videos.map((video) => {
					const info = {
						id: video.videoId,
						createTime: video.createTime,
						title: video.title,
						duration: video.duration,
						cover: video.coverURL,
					}
					return <VideoCard key={video.videoId} info={info} />
				})}
				{/* 当最后一行卡片个数不够填满一整行时，添加隐形的卡片，来维持最后一行卡片的大小 */}
				{videos.length === total && total !== 0 && addEmptyCard(videos.length)}
			</CardDeck>

			{/* 加载图标 */}
			{isLoading && videos.length !== total && (
				<SpinContainer>
					<Spin size="large" />
				</SpinContainer>
			)}

			{/* 没有更多视频的提示 */}
			{!hasMore && (
				<Empty
					image={emptyImage || love_you}
					imageStyle={{
						height: 230,
					}}
					description={<span style={{ fontSize: 'x-large' }}>没有更多视频啦</span>}
				/>
			)}

			{/* 回到顶部按钮 */}
			<BackTop>
				<Avatar size={80} />
			</BackTop>
		</InfiniteScroll>
	)
}

export default VideoList