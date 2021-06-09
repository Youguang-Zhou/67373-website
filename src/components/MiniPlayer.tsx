import { DownloadOutlined } from '@ant-design/icons'
import { IconButton, Slider } from '@material-ui/core'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import RepeatOneRoundedIcon from '@material-ui/icons/RepeatOneRounded'
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded'
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import { Col, Row } from 'antd'
import React, { FC, useContext, useState } from 'react'
import styled from 'styled-components'
import cat from '../assets/images/cat.jpeg'
import { MusicContext } from '../contexts/MusicContext'
import { PlayOrder } from '../utils/enums'
import { formatDuration } from '../utils/functions'
import Cover from './Cover'

const Box = styled(Row)`
	background-color: #121212;
	color: #fafafafa;
	text-align: center;
`

const Button = styled(IconButton)`
	opacity: 0.85;

	&:hover {
		opacity: 1;
	}
`

const DownloadLink = styled.a`
	color: #fafafafa;
	opacity: 0.85;

	&:hover {
		color: #fafafafa;
		opacity: 1;
	}
`

const MiniPlayer: FC = () => {
	const {
		isPlaying,
		currTime,
		currOrder,
		currPlayURL,
		setIsPlaying,
		setCurrOrder,
		getCurrSongInfo,
		syncPlayTime,
		switchSong,
	} = useContext(MusicContext)
	const { coverURL, duration, title } = getCurrSongInfo()
	const [draggingValue, setDraggingValue] = useState(0)

	// 播放或暂停
	const handlePlayOrPauseBtnClicked = () => setIsPlaying(!isPlaying)

	// 进度条左侧显示的时间，如果用户在拖拽进度条则显示拖拽进度，否则显示当前歌曲进度
	const displaySliderValue = () => (draggingValue !== 0 ? draggingValue : Math.min(currTime, duration))

	// 拖拽进度条时的调用
	const handleSliderValueChanged = (_: unknown, value: number | number[]) => setDraggingValue(value as number)

	// 拖拽进度条后松开鼠标的调用
	const handleSliderValueChangeCommitted = (_: unknown, value: number | number[]) => {
		syncPlayTime(value)
		setDraggingValue(0)
	}

	// 最右侧播放类型的按钮
	const renderPlayOrderBtn = () => {
		switch (currOrder) {
			case PlayOrder.Repeat:
				return <RepeatRoundedIcon color="secondary" fontSize="large" />
			case PlayOrder.RepeatOne:
				return <RepeatOneRoundedIcon color="secondary" fontSize="large" />
			case PlayOrder.Shuffle:
				return <ShuffleRoundedIcon color="secondary" fontSize="large" />
			default:
				break
		}
	}

	// 切换播放类型
	const handlePlayOrderBtnClicked = () => {
		switch (currOrder) {
			case PlayOrder.Repeat:
				setCurrOrder(PlayOrder.RepeatOne)
				break
			case PlayOrder.RepeatOne:
				setCurrOrder(PlayOrder.Shuffle)
				break
			case PlayOrder.Shuffle:
				setCurrOrder(PlayOrder.Repeat)
				break
			default:
				break
		}
	}

	return (
		<Box align="middle" justify="center">
			<Col xs={0} sm={0} md={4} lg={4} xl={4}>
				<Cover src={coverURL || cat} alt={title} size="calc(3vw + 3rem)" />
			</Col>
			<Col xs={22} sm={22} md={16} lg={16} xl={16}>
				<Row justify="center">
					<Col>
						<Button onClick={() => switchSong(-1)}>
							<SkipPreviousIcon color="secondary" fontSize="large" />
						</Button>
						<Button style={{ fontSize: '60px' }} onClick={handlePlayOrPauseBtnClicked}>
							{isPlaying ? (
								<PauseCircleOutlineIcon color="secondary" fontSize="inherit" />
							) : (
								<PlayCircleOutlineIcon color="secondary" fontSize="inherit" />
							)}
						</Button>
						<Button onClick={() => switchSong(1)}>
							<SkipNextIcon color="secondary" fontSize="large" />
						</Button>
					</Col>
				</Row>
				<Row>
					<Col span={4}>{formatDuration(displaySliderValue())}</Col>
					<Col span={16}>
						<Slider
							max={duration}
							value={displaySliderValue()}
							onChange={handleSliderValueChanged}
							onChangeCommitted={handleSliderValueChangeCommitted}
						/>
					</Col>
					<Col span={4}>{formatDuration(duration)}</Col>
				</Row>
			</Col>
			<Col xs={0} sm={0} md={4} lg={4} xl={4}>
				<Button onClick={handlePlayOrderBtnClicked}>{renderPlayOrderBtn()}</Button>
				<DownloadLink href={currPlayURL} target="_blank">
					<DownloadOutlined style={{ fontSize: '2.1875rem' }} />
				</DownloadLink>
			</Col>
		</Box>
	)
}

export default MiniPlayer
