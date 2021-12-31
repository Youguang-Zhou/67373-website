import {
	CloudDownload,
	PauseCircleOutline,
	PlayCircleOutline,
	RepeatOneRounded,
	RepeatRounded,
	ShuffleRounded,
	SkipNext,
	SkipPrevious,
} from '@mui/icons-material'
import { IconButton, IconButtonProps, IconProps, Slider } from '@mui/material'
import React, { HTMLProps, useContext, useState } from 'react'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import { PlayOrder } from '../utils/enums'
import { duration2Seconds, formatDuration } from '../utils/functions'

interface MiniPlayerProps {
	song: VodProps
	highlight: boolean
}

interface ButtonProps extends IconButtonProps {
	icon: IconProps
}

const Button = ({ icon, ...props }: ButtonProps) => (
	<IconButton size="large" color="inherit" {...props}>
		{icon}
	</IconButton>
)

const { Repeat, RepeatOne, Shuffle } = PlayOrder

const MiniPlayer = ({ song, highlight }: MiniPlayerProps) => {
	const [draggingValue, setDraggingValue] = useState(0)
	const { title, duration, description, coverURL } = song
	const { player, isPlaying, currTime, currOrder, setCurrOrder, switchSong, initializePlayer } =
		useContext(MusicContext)
	const { lyrics, setCurrLine } = useContext(LyricContext)

	// 进度条左侧显示的时间，如果用户在拖拽进度条则显示拖拽进度，否则显示当前歌曲进度
	const displaySliderValue = () =>
		draggingValue !== 0 ? draggingValue : Math.min(currTime, duration)

	// 拖拽进度条时的调用
	const handleSliderValueChanged = (_: unknown, value: number | number[]) =>
		setDraggingValue(value as number)

	// 拖拽进度条后松开鼠标的调用
	const handleSliderValueChangeCommitted = (_: unknown, value: number | number[]) => {
		if (!player || typeof value !== 'number') return
		player.currentTime = value
		setDraggingValue(0)
		// 处理歌词
		let max = 0
		let maxIndex = 0
		lyrics?.map((lyric: string, index: number) => {
			const seconds = duration2Seconds(`00:${lyric.slice(1, 6)}`)
			if (seconds >= max && seconds <= value) {
				max = seconds
				maxIndex = index
			}
		})
		setCurrLine(Math.max(0, maxIndex))
	}

	// 播放或暂停按钮点击时的调用
	const handlePlayOrPauseBtnClicked = () => {
		if (player) {
			player.paused ? player.play() : player.pause()
		} else {
			// 新页面下点击播放需要初始化播放器
			initializePlayer(song)
		}
	}

	// 显示歌词页面
	const showLyricView = () => document.getElementById('lyric-view')?.scrollIntoView()

	const LyricBtn = (props: HTMLProps<HTMLDivElement>) => (
		<div {...props}>
			<Button
				icon={<span>词</span>}
				onClick={showLyricView}
				color={highlight ? 'primary' : 'inherit'}
			/>
		</div>
	)

	const PlayOrderBtn = (props: HTMLProps<HTMLDivElement>) => (
		<div {...props}>
			<Button
				icon={
					<>
						{currOrder === Repeat && <RepeatRounded />}
						{currOrder === RepeatOne && <RepeatOneRounded />}
						{currOrder === Shuffle && <ShuffleRounded />}
					</>
				}
				onClick={() => {
					currOrder === Repeat && setCurrOrder(RepeatOne)
					currOrder === RepeatOne && setCurrOrder(Shuffle)
					currOrder === Shuffle && setCurrOrder(Repeat)
				}}
			/>
		</div>
	)

	const DurationTag = ({ type }: { type: 'start' | 'end' }) => (
		<span className="opacity-80 tabular-nums">
			{formatDuration(type === 'start' ? displaySliderValue() : duration)}
		</span>
	)

	return (
		<section className="mini-player">
			{/* 左侧封面及歌曲名 */}
			<div className="hidden w-1/4 space-x-4 md:flex">
				<img
					alt={title}
					src={coverURL}
					onClick={showLyricView}
					className="w-24 h-24 rounded-md cursor-pointer"
				/>
				<div className="flex flex-col justify-center">
					<h3 className="text-2xl line-clamp-2">{title}</h3>
					<small className="text-lg">陈一发儿</small>
				</div>
			</div>
			{/* 中间控件 */}
			<div className="flex-1 md:mx-4">
				<div className="flex-center">
					<LyricBtn className="block md:hidden" />
					<Button icon={<SkipPrevious />} onClick={() => switchSong(-1, true)} />
					<Button
						icon={
							isPlaying ? (
								<PauseCircleOutline className="big-btn" />
							) : (
								<PlayCircleOutline className="big-btn" />
							)
						}
						onClick={handlePlayOrPauseBtnClicked}
					/>
					<Button icon={<SkipNext />} onClick={() => switchSong(1, true)} />
					<PlayOrderBtn className="block md:hidden" />
				</div>

				<div className="flex-center">
					<DurationTag type="start" />
					<Slider
						size="small"
						max={duration}
						className="mx-4"
						value={displaySliderValue()}
						onChange={handleSliderValueChanged}
						onChangeCommitted={handleSliderValueChangeCommitted}
					/>
					<DurationTag type="end" />
				</div>
			</div>
			{/* 右侧按钮组 */}
			<div className="hidden w-1/4 flex-center md:flex">
				<LyricBtn />
				<PlayOrderBtn />
				<Button icon={<CloudDownload />} onClick={() => open(description)} />
			</div>
		</section>
	)
}

export default MiniPlayer
