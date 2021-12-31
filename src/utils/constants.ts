import { orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { QueryClient } from 'react-query'
import aposhuo from '../assets/aposhuo.jpeg'
import tonghuazhen from '../assets/tonghuazhen.jpeg'
import xianshangyouchunqiu from '../assets/xianshangyouchunqiu.jpeg'

export const muiTheme = createTheme({ palette: { primary: orange } })
export const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

export const EXPIRED_DATE = 3
export const BACK_TO_TOP_HEIGHT = 2000
export const BREAKPOINT_SM = '(min-width: 640px)'
export const BREAKPOINT_LG = '(min-width: 1024px)'
export const NOT_SCROLL_LINE = 6 // 前几行先不滚动
export const LYRIC_HEIGHT = 44 // 每行歌词高度
export const MINIPLAYER_HEIGHT = 121 // 迷你播放器高度

export const ORIGINALS = [
	{
		id: process.env.REACT_APP_VOD_VIDEO_ID_TONGHUAZHEN,
		name: '童话镇',
		cover: tonghuazhen,
	},
	{
		id: process.env.REACT_APP_VOD_VIDEO_ID_APOSHUO,
		name: '阿婆说',
		cover: aposhuo,
	},
	{
		id: process.env.REACT_APP_VOD_VIDEO_ID_XIANSHANGYOUCHUNQIU,
		name: '弦上有春秋',
		cover: xianshangyouchunqiu,
	},
]

export const CATEGORIES = [
	process.env.REACT_APP_VOD_CATE_ID_CHANGGE,
	process.env.REACT_APP_VOD_CATE_ID_ZHIBOHUIFANG,
	process.env.REACT_APP_VOD_CATE_ID_ZHIBOJIANJI,
	process.env.REACT_APP_VOD_CATE_ID_CHAHUAHUI,
	process.env.REACT_APP_VOD_CATE_ID_YOUXI,
	process.env.REACT_APP_VOD_CATE_ID_RICHANG,
]
