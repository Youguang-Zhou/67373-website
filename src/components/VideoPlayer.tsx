import React, { useEffect, useRef } from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import zhCN from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'
import '../utils/video-player.css'

const initialOptions: VideoJsPlayerOptions = {
	autoplay: true,
	bigPlayButton: false,
	controls: true,
	fluid: true,
	language: 'zhCN',
	languages: { zhCN },
	nativeControlsForTouch: true,
	preload: 'auto',
	controlBar: {
		volumePanel: {
			inline: true,
		},
	},
}

interface VideoPlayerProps {
	onLoad: (player: VideoJsPlayer) => void
}

const VideoPlayer = ({ onLoad }: VideoPlayerProps) => {
	const playerRef = useRef<VideoJsPlayer>()
	const noticeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		playerRef.current = videojs('video-player-67373', {
			...initialOptions,
			userActions: { hotkeys: setupHotkeys },
		})
		playerRef.current.volume(0.7)
		onLoad(playerRef.current)
		return () => {
			if (playerRef.current) {
				playerRef.current.dispose()
			}
		}
	}, [])

	const notice = (text: string) => {
		const { current } = noticeRef
		if (!current) return
		let timer = undefined
		current.innerHTML = text
		current.style.opacity = '0.8'
		timer && clearTimeout(timer)
		timer = setTimeout(() => (current.style.opacity = '0'), 1000)
	}

	const setupHotkeys = ({ preventDefault, which }: videojs.KeyboardEvent) => {
		preventDefault()
		const { current } = playerRef
		const second = 5 // 快进或者快退的秒数
		const volume = 0.1 // 增加或者降低的音量
		switch (which) {
			// 空格键：暂停或者播放
			case 32:
				current?.paused() ? current?.play() : current?.pause()
				break
			// 右键：快进5秒
			case 39:
				if (current?.liveTracker.isLive() === false) {
					current?.currentTime(current?.currentTime() + second)
					notice(`快进${second}秒`)
				}
				break
			// 左键：快退5秒
			case 37:
				if (current?.liveTracker.isLive() === false) {
					current?.currentTime(current?.currentTime() - second)
					notice(`快退${second}秒`)
				}
				break
			// 上键：音量增加10%
			case 38:
				current?.volume(current?.volume() + volume)
				notice(`音量${Math.round((current?.volume() || 0) * 100)}%`)
				break
			// 下键：音量降低10%
			case 40:
				current?.volume(current?.volume() - volume)
				notice(`音量${Math.round((current?.volume() || 0) * 100)}%`)
				break
			default:
				break
		}
	}

	return (
		<div className="relative">
			{/* 视频 */}
			<video id="video-player-67373" className="video-js vjs-16-9 custom-css" />
			{/* 键盘快捷键提示 */}
			<span
				ref={noticeRef}
				className="absolute px-4 py-1 transition-all bg-black rounded opacity-0 text-light bg-opacity-70 bottom-12 left-4"
			></span>
		</div>
	)
}

export default VideoPlayer
