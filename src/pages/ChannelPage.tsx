import { Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { Col, Row } from 'antd'
import React, { ChangeEvent, FC, ReactNode, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import styled from 'styled-components'
import aposhuo from '../assets/aposhuo.jpeg'
import banner from '../assets/banner.jpeg'
import fafa_1 from '../assets/fafa_1.png'
import fafa_2 from '../assets/fafa_2.png'
import fafa_3 from '../assets/fafa_3.png'
import fafa_4 from '../assets/fafa_4.png'
import fafa_5 from '../assets/fafa_5.png'
import fafa_rose from '../assets/fafa_rose.png'
import tonghuazhen from '../assets/tonghuazhen.jpeg'
import xianshangyouchunqiu from '../assets/xianshangyouchunqiu.jpeg'
import xiruisi from '../assets/xiruisi.png'
import Avatar from '../components/Avatar'
import Link from '../components/Link'
import VideoList from '../components/VideoList'

const {
	REACT_APP_VOD_TONGHUAZHEN_VIDEO_ID,
	REACT_APP_VOD_APOSHUO_VIDEO_ID,
	REACT_APP_VOD_XIANSHANGYOUCHUNQIU_VIDEO_ID,
	REACT_APP_VOD_CHANGGE_CATE_ID,
	REACT_APP_VOD_ZHIBO_CATE_ID,
	REACT_APP_VOD_CHAHUAHUI_CATE_ID,
	REACT_APP_VOD_YOUXI_CATE_ID,
	REACT_APP_VOD_RICHANG_CATE_ID,
} = process.env

const { Item } = Carousel

const CarouselLink = styled(Link)`
	display: flex;
	justify-content: center;
`

const FaFaAndRose = styled.img`
	width: 100%;
	position: absolute;
	bottom: 0;
`

interface TabPanelProps {
	children?: ReactNode
	value: number
	index: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
	<div role="tabpanel" hidden={value !== index} style={{ backgroundColor: 'whitesmoke' }}>
		{value === index && <div style={{ padding: '1vw 5vw' }}>{children}</div>}
	</div>
)

const ChannelPage: FC = () => {
	const [value, setValue] = useState(0)
	const scrollableTabs = useMediaQuery(useTheme().breakpoints.down('sm'))

	const handleChange = (event: ChangeEvent<Record<string, never>>, value: number) => setValue(value)

	return (
		<>
			<img src={banner} alt="banner" style={{ width: '100%' }} />
			<Row align="middle" justify="center" style={{ margin: '16px 0px 4px 0px' }}>
				<Avatar size={80} style={{ marginRight: '2vw' }} />
				<div style={{ marginRight: '14vw' }}>
					<Row align="middle">
						<Typography variant="h5">陈一发儿</Typography>
						<MusicNoteIcon color="primary" fontSize="small" style={{ marginBottom: '5px' }} />
					</Row>
					<Typography variant="caption">673.73万位订阅者</Typography>
				</div>
				<a href="https://chenyifaer.taobao.com/" target="_blank" rel="noopener noreferrer">
					<img src={xiruisi} alt="喜瑞斯" style={{ border: '1px solid rgb(4,7,110)', borderRadius: '5px' }} />
				</a>
			</Row>
			<Tabs
				value={value}
				scrollButtons="on"
				centered={!scrollableTabs}
				variant={scrollableTabs ? 'scrollable' : 'standard'}
				textColor="primary"
				indicatorColor="primary"
				onChange={handleChange}
			>
				<Tab label="唱歌视频" />
				<Tab label="直播剪辑" />
				<Tab label="茶话会文字视频" />
				<Tab label="游戏视频" />
				<Tab label="日常" />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Row align="middle">
					<Typography variant="h5" gutterBottom>
						作品集
					</Typography>
					<FavoriteIcon style={{ color: 'crimson', marginBottom: '8px' }} />
				</Row>
				<Row>
					{/* 主题曲置顶 */}
					<Col xs={24} sm={20} md={16} lg={12} xl={8}>
						<Carousel>
							<Item>
								<CarouselLink to={`/watch/${REACT_APP_VOD_TONGHUAZHEN_VIDEO_ID}`}>
									<img src={tonghuazhen} alt="童话镇" />
								</CarouselLink>
							</Item>
							<Item>
								<CarouselLink to={`/watch/${REACT_APP_VOD_APOSHUO_VIDEO_ID}`}>
									<img src={aposhuo} alt="阿婆说" />
								</CarouselLink>
							</Item>
							<Item>
								<CarouselLink to={`/watch/${REACT_APP_VOD_XIANSHANGYOUCHUNQIU_VIDEO_ID}`}>
									<img src={xianshangyouchunqiu} alt="弦上有春秋" />
								</CarouselLink>
							</Item>
						</Carousel>
					</Col>
					<Col xs={0} sm={4}>
						<FaFaAndRose src={fafa_rose} alt="发发与玫瑰" />
					</Col>
				</Row>
				<hr />
				<Row align="middle">
					<Typography variant="h5">歌曲集</Typography>
					<LibraryMusicIcon />
				</Row>
				{/* 唱歌视频 */}
				<VideoList cateId={REACT_APP_VOD_CHANGGE_CATE_ID} emptyImage={fafa_1} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				{/* 直播剪辑 */}
				<VideoList cateId={REACT_APP_VOD_ZHIBO_CATE_ID} emptyImage={fafa_2} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				{/* 茶话会文字视频 */}
				<VideoList cateId={REACT_APP_VOD_CHAHUAHUI_CATE_ID} emptyImage={fafa_3} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				{/* 游戏视频 */}
				<VideoList cateId={REACT_APP_VOD_YOUXI_CATE_ID} emptyImage={fafa_4} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				{/* 日常 */}
				<VideoList cateId={REACT_APP_VOD_RICHANG_CATE_ID} emptyImage={fafa_5} />
			</TabPanel>
		</>
	)
}

export default ChannelPage
