import { Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { Row } from 'antd'
import React, { ChangeEvent, FC, ReactNode, useState } from 'react'
import banner from '../assets/banner.jpeg'
import fafa_1 from '../assets/fafa_1.png'
import fafa_2 from '../assets/fafa_2.png'
import fafa_3 from '../assets/fafa_3.png'
import fafa_4 from '../assets/fafa_4.png'
import fafa_5 from '../assets/fafa_5.png'
import xiruisi from '../assets/xiruisi.png'
import Avatar from '../components/Avatar'
import VideoList from '../components/VideoList'

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
				<div style={{ marginRight: '20vw' }}>
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
				{/* 唱歌视频 */}
				<VideoList cateId={process.env.REACT_APP_VOD_CHANGGE_CATE_ID} emptyImage={fafa_1} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				{/* 直播剪辑 */}
				<VideoList cateId={process.env.REACT_APP_VOD_ZHIBO_CATE_ID} emptyImage={fafa_2} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				{/* 茶话会文字视频 */}
				<VideoList cateId={process.env.REACT_APP_VOD_CHAHUAHUI_CATE_ID} emptyImage={fafa_3} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				{/* 游戏视频 */}
				<VideoList cateId={process.env.REACT_APP_VOD_YOUXI_CATE_ID} emptyImage={fafa_4} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				{/* 日常 */}
				<VideoList cateId={process.env.REACT_APP_VOD_RICHANG_CATE_ID} emptyImage={fafa_5} />
			</TabPanel>
		</>
	)
}

export default ChannelPage
