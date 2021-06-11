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
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import { PlayOrder } from '../utils/enums'
import { durationToSeconds, formatDuration } from '../utils/functions'

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

interface IMiniPlayer {
	onCoverClicked: () => void
}

const MiniPlayer: FC<IMiniPlayer> = ({ onCoverClicked }: IMiniPlayer) => {
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
	const { lyrics, shouldShowLyricView, setCurrLine, setShouldShowLyricView } = useContext(LyricContext)
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
		// handle lyric
		let max = 0
		let maxIndex = 0
		lyrics.map((lyric: string, index: number) => {
			const seconds = durationToSeconds(`00:${lyric.slice(1, 6)}`)
			if (seconds >= max && seconds <= value) {
				max = seconds
				maxIndex = index
			}
		})
		setCurrLine(Math.max(0, maxIndex))
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

	// 歌词按钮
	const LyricBtn = (
		<Button
			color={shouldShowLyricView ? 'primary' : 'secondary'}
			variant="outlined"
			style={{ minWidth: 'auto' }}
			onClick={() => setShouldShowLyricView(!shouldShowLyricView)}
		>
			词
		</Button>
	)

	// 播放顺序按钮
	const PlayOrderBtn = (
		<IconButton color="secondary" onClick={handlePlayOrderBtnClicked}>
			{currOrder === PlayOrder.Repeat && <RepeatRoundedIcon fontSize="large" />}
			{currOrder === PlayOrder.RepeatOne && <RepeatOneRoundedIcon fontSize="large" />}
			{currOrder === PlayOrder.Shuffle && <ShuffleRoundedIcon fontSize="large" />}
		</IconButton>
	)

	return (
		<Box className="fixed-bottom" align="middle" justify="center">
			<Col xs={0} md={6} role="button" onClick={() => onCoverClicked()}>
				<Row align="middle" justify="center">
					<Col xs={0} md={16} lg={8}>
						<img className="h-75 w-75 rounded" src={coverURL || cat} alt={title} />
					</Col>
					<Col xs={0} md={24} lg={16}>
						<Row className="fs-3">{title}</Row>
						<Row>陈一发儿</Row>
					</Col>
				</Row>
			</Col>
			<Col xs={22} md={12}>
				<Row align="middle" justify="center">
					<Col xs={5} md={0}>
						{LyricBtn}
					</Col>
					<Col xs={4} md={6} lg={3}>
						<IconButton color="secondary" onClick={() => switchSong(-1)}>
							<SkipPreviousIcon fontSize="large" />
						</IconButton>
					</Col>
					<Col xs={6} md={6} lg={3}>
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
					</Col>
					<Col xs={4} md={6} lg={3}>
						<IconButton color="secondary" onClick={() => switchSong(1)}>
							<SkipNextIcon fontSize="large" />
						</IconButton>
					</Col>
					<Col xs={5} md={0}>
						{PlayOrderBtn}
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
			<Col xs={0} md={6}>
				<Row align="middle" justify="center">
					<Col xs={0} md={6} lg={4}>
						{LyricBtn}
					</Col>
					<Col xs={0} md={6} lg={4}>
						{PlayOrderBtn}
					</Col>
					<Col xs={0} md={6} lg={4}>
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
