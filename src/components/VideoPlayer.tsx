import React, { FC, useEffect, useRef } from 'react'
import videojs from 'video.js'
import zhCN from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.css'
import '../video-player.css'

interface IVideoPlayer {
	options: videojs.PlayerOptions
}

const initialOptions: videojs.PlayerOptions = {
	autoplay: true,
	controls: true,
	fluid: true,
	language: 'zhCN',
	languages: { zhCN },
	nativeControlsForTouch: true,
	preload: 'auto',
	userActions: {
		hotkeys: true,
	},
	controlBar: {
		volumePanel: {
			inline: true,
		},
	},
}

const VideoPlayer: FC<IVideoPlayer> = ({ options }: IVideoPlayer) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const playerRef = useRef<videojs.Player | null>(null)

	useEffect(() => {
		playerRef.current = videojs(videoRef.current, {
			...initialOptions,
			...options,
		})
		return () => {
			if (playerRef.current) {
				playerRef.current.dispose()
			}
		}
	}, [options])

	return <video ref={videoRef} className="video-js vjs-16-9 custom-css" />
}

export default VideoPlayer
