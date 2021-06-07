import { Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { Avatar, Carousel, Col, Empty, Pagination, Row } from 'antd'
import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import aposhuo from '../assets/images/aposhuo.jpeg'
import cat from '../assets/images/cat.jpeg'
import channel_banner from '../assets/images/channel_banner.jpeg'
import fafa_0 from '../assets/images/fafa_0.png'
import fafa_1 from '../assets/images/fafa_1.png'
import fafa_2 from '../assets/images/fafa_2.png'
import fafa_3 from '../assets/images/fafa_3.png'
import fafa_4 from '../assets/images/fafa_4.png'
import fafa_5 from '../assets/images/fafa_5.png'
import fafa_rose from '../assets/images/fafa_rose.png'
import tonghuazhen from '../assets/images/tonghuazhen.jpeg'
import xianshangyouchunqiu from '../assets/images/xianshangyouchunqiu.jpeg'
import xiruisi from '../assets/images/xiruisi.png'
import Banner from '../components/Banner'
import Error from '../components/Error'
import VideoCard from '../components/VideoCard'
import useGetPlayListRequest from '../hooks/useGetPlayListRequest'
import { IVod } from '../utils/interfaces'

const categories = [
	process.env.REACT_APP_VOD_CATE_ID_CHANGGE,
	process.env.REACT_APP_VOD_CATE_ID_ZHIBOHUIFANG,
	process.env.REACT_APP_VOD_CATE_ID_ZHIBOJIANJI,
	process.env.REACT_APP_VOD_CATE_ID_CHAHUAHUI,
	process.env.REACT_APP_VOD_CATE_ID_YOUXI,
	process.env.REACT_APP_VOD_CATE_ID_RICHANG,
]

const emptyImages = [fafa_0, fafa_1, fafa_2, fafa_3, fafa_4, fafa_5]

const FaFaAndRose = styled.img`
	width: 100%;
	position: absolute;
	bottom: 0;
`

interface ITabPanel {
	children?: ReactNode
	value: number
	index: number
}

const ChannelPage: FC = () => {
	const [videos, setVideos] = useState<IVod[]>([])
	const [pageNo, setPageNo] = useState(1)
	const pageSize = useState(12)[0]
	const [currTabIndex, setCurrTabIndex] = useState(0)
	const scrollableTabs = useMediaQuery(useTheme().breakpoints.down('sm'))
	const { data, hasError, hasMore } = useGetPlayListRequest(categories[currTabIndex], pageNo, pageSize)

	useEffect(() => {
		data.videoList && setVideos(data.videoList.video)
	}, [data])

	const handleChange = (event: ChangeEvent<Record<string, never>>, value: number) => {
		setCurrTabIndex(value)
		setPageNo(1)
	}

	const TabPanel = ({ children, value, index }: ITabPanel) => (
		<div role="tabpanel" hidden={value !== index} style={{ backgroundColor: 'whitesmoke', padding: '1vw 5vw' }}>
			{hasError ? (
				<Error />
			) : (
				<>
					{value === index && (
						<>
							{children}
							<section className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
								{videos.map((video) => (
									<VideoCard key={video.videoId} video={video} />
								))}
							</section>
							{!hasMore && (
								<Empty
									className="fs-3 mt-3"
									image={emptyImages[currTabIndex]}
									imageStyle={{ height: '20rem' }}
									description="没有更多视频啦"
								/>
							)}
							<Pagination
								className="text-center mt-4"
								total={data.total || 0}
								current={pageNo}
								defaultPageSize={pageSize}
								showQuickJumper={(data.total || 0) > pageSize}
								showSizeChanger={false}
								onChange={(pageNo) => setPageNo(pageNo)}
							/>
						</>
					)}
				</>
			)}
		</div>
	)

	return (
		<>
			<Banner src={channel_banner} alt="channel_banner" />
			<Row className="my-3" align="middle" justify="center">
				<Col>
					<Avatar src={cat} size={80} />
				</Col>
				<Col style={{ margin: '0 15vw 0 2vw' }}>
					<Row align="middle">
						<Typography variant="h5">陈一发儿</Typography>
						<MusicNoteIcon color="primary" fontSize="small" />
					</Row>
					<Row>
						<Typography variant="caption">673.73万位订阅者</Typography>
					</Row>
				</Col>
				<Col>
					<a href="https://chenyifaer.taobao.com/" target="_blank" rel="noopener noreferrer">
						<img
							src={xiruisi}
							alt="喜瑞斯"
							style={{ border: '1px solid rgb(4,7,110)', borderRadius: '5px' }}
						/>
					</a>
				</Col>
			</Row>
			<Tabs
				value={currTabIndex}
				scrollButtons="on"
				centered={!scrollableTabs}
				variant={scrollableTabs ? 'scrollable' : 'standard'}
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
				<Row align="middle">
					<Typography variant="h5" gutterBottom>
						作品集
					</Typography>
					<FavoriteIcon style={{ color: 'crimson', marginBottom: '8px' }} />
				</Row>
				<Row>
					{/* 主题曲置顶 */}
					<Col sm={24} md={16} lg={12} xl={8}>
						<Carousel autoplay>
							<Link to={`/watch/${process.env.REACT_APP_VOD_VIDEO_ID_TONGHUAZHEN}`} target="_blank">
								<img className="w-100" src={tonghuazhen} alt="童话镇" />
							</Link>
							<Link to={`/watch/${process.env.REACT_APP_VOD_VIDEO_ID_APOSHUO}`} target="_blank">
								<img className="w-100" src={aposhuo} alt="阿婆说" />
							</Link>
							<Link
								to={`/watch/${process.env.REACT_APP_VOD_VIDEO_ID_XIANSHANGYOUCHUNQIU}`}
								target="_blank"
							>
								<img className="w-100" src={xianshangyouchunqiu} alt="弦上有春秋" />
							</Link>
						</Carousel>
					</Col>
					<Col sm={0} md={8}>
						<FaFaAndRose src={fafa_rose} alt="发发与玫瑰" />
					</Col>
				</Row>
				<hr />
				<Row align="middle">
					<Typography variant="h5">歌曲集</Typography>
					<LibraryMusicIcon />
				</Row>
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
		</>
	)
}

export default ChannelPage
