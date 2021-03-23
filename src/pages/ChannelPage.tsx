import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { Row } from 'antd'
import React, { ChangeEvent, FC, ReactNode, useState } from 'react'
import banner from '../assets/banner.jpeg'
import Avatar from '../components/Avatar'

interface TabPanelProps {
	children?: ReactNode
	value: number
	index: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
	<div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		style={{ backgroundColor: 'whitesmoke' }}
	>
		{value === index && (
			<Box p={3}>
				<Typography>{children}</Typography>
			</Box>
		)}
	</div>
)

const ChannelPage: FC = () => {
	const [value, setValue] = useState(0)

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
				<h4>喜瑞斯</h4>
			</Row>
			<Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
				<Tab label="唱歌视频" />
				<Tab label="直播剪辑" />
				<Tab label="茶话会文字视频" />
				<Tab label="游戏视频" />
				<Tab label="日常" />
			</Tabs>
			<TabPanel value={value} index={0}>
				唱歌视频
			</TabPanel>
			<TabPanel value={value} index={1}>
				直播剪辑
			</TabPanel>
			<TabPanel value={value} index={2}>
				茶话会文字视频
			</TabPanel>
			<TabPanel value={value} index={3}>
				游戏视频
			</TabPanel>
			<TabPanel value={value} index={4}>
				日常
			</TabPanel>
		</>
	)
}

export default ChannelPage
