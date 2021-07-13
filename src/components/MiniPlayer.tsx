import { Button, IconButton, Slider, useMediaQuery } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import RepeatOneRoundedIcon from '@material-ui/icons/RepeatOneRounded'
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded'
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import React, { FC, useContext, useState } from 'react'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import { PlayOrder } from '../utils/enums'
import { durationToSeconds, formatDuration } from '../utils/functions'
import { VodProps } from '../utils/interfaces'

interface MiniPlayerProps {
	currSong: VodProps
}

const MiniPlayer: FC<MiniPlayerProps> = ({ currSong }: MiniPlayerProps) => {
	const { title, duration, description, coverURL } = currSong
	const { currTime, currOrder, setCurrTime, setCurrOrder, getIsPlaying, seek, playAudio, pauseAudio, switchSong } =
		useContext(MusicContext)
	const { lyrics, shouldShowLyricView, setCurrLine, setShouldShowLyricView } = useContext(LyricContext)
	const btnSize = useMediaQuery('(min-width: 640px)') ? 'large' : 'small'
	const [draggingValue, setDraggingValue] = useState<number>(0)

	// 播放或暂停
	const handlePlayOrPauseBtnClicked = () => {
		getIsPlaying() ? pauseAudio() : playAudio(currSong)
	}

	// 进度条左侧显示的时间，如果用户在拖拽进度条则显示拖拽进度，否则显示当前歌曲进度
	const displaySliderValue = () => (draggingValue !== 0 ? draggingValue : Math.min(currTime, duration))

	// 拖拽进度条时的调用
	const handleSliderValueChanged = (_: unknown, value: number | number[]) => setDraggingValue(value as number)

	// 拖拽进度条后松开鼠标的调用
	const handleSliderValueChangeCommitted = (_: unknown, value: number | number[]) => {
		seek(value)
		setCurrTime(value)
		setDraggingValue(0)
		// 处理歌词
		let max = 0
		let maxIndex = 0
		lyrics?.map((lyric: string, index: number) => {
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
	const LyricBtn: FC = () => (
		<Button
			size={btnSize}
			variant="outlined"
			className="opacity-80 hover:opacity-100"
			style={{
				minWidth: 'auto',
				margin: '0.75rem',
				padding: btnSize === 'small' ? '0.125rem 0.25rem' : '0.25rem 1rem',
			}}
			color={shouldShowLyricView ? 'primary' : 'inherit'}
			onClick={() => setShouldShowLyricView(!shouldShowLyricView)}
		>
			词
		</Button>
	)

	// 播放顺序按钮
	const PlayOrderBtn: FC = () => (
		<IconButton color="inherit" onClick={handlePlayOrderBtnClicked}>
			{currOrder === PlayOrder.Repeat && <RepeatRoundedIcon fontSize={btnSize} />}
			{currOrder === PlayOrder.RepeatOne && <RepeatOneRoundedIcon fontSize={btnSize} />}
			{currOrder === PlayOrder.Shuffle && <ShuffleRoundedIcon fontSize={btnSize} />}
		</IconButton>
	)

	return (
		<section className="fixed inset-x-0 bottom-0 flex px-4 py-1 space-x-4 border-t md:py-2 md:px-6 lg:px-10 border-opacity-30 bg-spotify-900 bg-opacity-80 backdrop-filter backdrop-blur">
			<div className="items-center hidden w-1/4 space-x-8 xl:w-1/5 2xl:w-1/6 lg:flex">
				<img
					className="w-24 h-24 rounded-md cursor-pointer"
					src={coverURL}
					alt={title}
					onClick={() => setShouldShowLyricView(true)}
				/>
				<div className="flex-1">
					<h5 className="text-3xl">{title}</h5>
					<small className="text-lg">陈一发儿</small>
				</div>
			</div>
			<div className="flex-1">
				<div className="flex items-center justify-evenly lg:justify-center">
					<div className="block lg:hidden">
						<LyricBtn />
					</div>
					<IconButton color="inherit" onClick={() => switchSong(-1, true)}>
						<SkipPreviousIcon fontSize={btnSize} />
					</IconButton>
					<IconButton
						color="inherit"
						onClick={handlePlayOrPauseBtnClicked}
						style={{
							fontSize: btnSize === 'large' ? '4rem' : '3rem',
							margin: btnSize === 'large' ? '0rem 1rem' : '0rem',
						}}
					>
						{getIsPlaying() ? (
							<PauseCircleOutlineIcon fontSize="inherit" />
						) : (
							<PlayCircleOutlineIcon fontSize="inherit" />
						)}
					</IconButton>
					<IconButton color="inherit" onClick={() => switchSong(1, true)}>
						<SkipNextIcon fontSize={btnSize} />
					</IconButton>
					<div className="block lg:hidden">
						<PlayOrderBtn />
					</div>
				</div>
				<div className="flex items-center justify-center space-x-6 lg:space-x-8">
					<span className="opacity-80 tabular-nums">{formatDuration(displaySliderValue())}</span>
					<Slider
						className="max-w-3xl"
						max={duration}
						value={displaySliderValue()}
						onChange={handleSliderValueChanged}
						onChangeCommitted={handleSliderValueChangeCommitted}
					/>
					<span className="opacity-80 tabular-nums">{formatDuration(duration)}</span>
				</div>
			</div>
			<div className="items-center justify-center hidden w-1/4 space-x-4 xl:w-1/5 2xl:w-1/6 lg:flex">
				<LyricBtn />
				<PlayOrderBtn />
				<IconButton color="inherit" onClick={() => open(description)}>
					<CloudDownloadIcon fontSize={btnSize} />
				</IconButton>
			</div>
		</section>
	)
}

export default MiniPlayer
