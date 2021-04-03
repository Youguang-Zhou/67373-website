import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import zhCN from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'
import '../utils/video-player.css'

const Notice = styled.div`
	background: rgba(0, 0, 0, 0.8);
	border-radius: 5px;
	bottom: 4.5em;
	color: white;
	font-size: 14px;
	left: 1em;
	opacity: 0;
	padding: 6px 16px;
	pointer-events: none;
	position: absolute;
	transition: all 0.3s ease-in-out;
`

interface IVideoPlayer {
	options: VideoJsPlayerOptions
	onLoad?: (player: VideoJsPlayer) => void
}

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

const VideoPlayer: FC<IVideoPlayer> = ({ options, onLoad }: IVideoPlayer) => {
	const playerRef = useRef<VideoJsPlayer>()
	const noticeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		playerRef.current = videojs('video-player-67373', {
			...initialOptions,
			...options,
			userActions: {
				hotkeys: ({ which }) => setupHotkeys(which),
			},
		})
		onLoad && onLoad(playerRef.current)
		return () => {
			if (playerRef.current) {
				playerRef.current.dispose()
			}
		}
	}, [options])

	const notice = (text: string) => {
		const { current } = noticeRef
		if (current) {
			let timer = undefined
			current.innerHTML = text
			current.style.opacity = '0.8'
			timer && clearTimeout(timer)
			timer = setTimeout(() => {
				current.style.opacity = '0'
			}, 1000)
		}
	}

	const setupHotkeys = (keycode: number) => {
		const { current } = playerRef
		const second = 5 // 快进或者快退的秒数
		const volume = 0.1 // 增加或者降低的音量
		switch (keycode) {
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
				playerRef.current?.volume(playerRef.current?.volume() - volume)
				notice(`音量${Math.round((playerRef.current?.volume() || 0) * 100)}%`)
				break
			default:
				break
		}
	}

	return (
		<div>
			<video id="video-player-67373" className="video-js vjs-16-9 custom-css" />
			<Notice ref={noticeRef} />
		</div>
	)
}

export default VideoPlayer
