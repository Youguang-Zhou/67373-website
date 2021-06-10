import { Button, IconButton, Slider } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
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
	backdrop-filter: blur(5px);
	background-color: #121212cc;
	border: 1px solid rgb(255 255 255 / 30%);
	border-radius: 2rem;
	color: #fafafafa;
	margin: 0rem 1rem;
	padding: 1rem;
	text-align: center;

	button {
		opacity: 0.85;

		&:hover {
			opacity: 1;
		}
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
				return <RepeatRoundedIcon fontSize="large" />
			case PlayOrder.RepeatOne:
				return <RepeatOneRoundedIcon fontSize="large" />
			case PlayOrder.Shuffle:
				return <ShuffleRoundedIcon fontSize="large" />
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
		<Box className="fixed-bottom" align="middle" justify="center">
			<Col xs={0} sm={0} md={6} lg={6} xl={6}>
				<Row align="middle" justify="center" gutter={32}>
					<Col>
						<Cover src={coverURL || cat} alt={title} size="calc(3vw + 3rem)" />
					</Col>
					<Col>
						<Row className="fs-3">{title}</Row>
						<Row>陈一发儿</Row>
					</Col>
				</Row>
			</Col>
			<Col xs={22} sm={22} md={12} lg={12} xl={12}>
				<Row justify="center">
					<Col>
						<IconButton color="secondary" onClick={() => switchSong(-1)}>
							<SkipPreviousIcon fontSize="large" />
						</IconButton>
						<IconButton
							color="secondary"
							style={{ fontSize: '60px' }}
							onClick={handlePlayOrPauseBtnClicked}
						>
							{isPlaying ? (
								<PauseCircleOutlineIcon fontSize="inherit" />
							) : (
								<PlayCircleOutlineIcon fontSize="inherit" />
							)}
						</IconButton>
						<IconButton color="secondary" onClick={() => switchSong(1)}>
							<SkipNextIcon fontSize="large" />
						</IconButton>
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
			<Col xs={0} sm={0} md={6} lg={6} xl={6}>
				<Row align="middle" justify="center">
					<Col span={4}>
						<Button color="secondary" variant="outlined" style={{ minWidth: 'auto' }}>
							词
						</Button>
					</Col>
					<Col span={4}>
						<IconButton color="secondary" onClick={handlePlayOrderBtnClicked}>
							{renderPlayOrderBtn()}
						</IconButton>
					</Col>
					<Col span={4}>
						<IconButton color="secondary">
							<a
								href={currPlayURL}
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: 'inherit' }}
							>
								<CloudDownloadIcon fontSize="large" />
							</a>
						</IconButton>
					</Col>
				</Row>
			</Col>
		</Box>
	)
}

export default MiniPlayer
