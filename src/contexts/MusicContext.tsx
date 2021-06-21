import React, { createContext, FC, useEffect, useRef, useState } from 'react'
import { API } from '../utils/api'
import { PlayOrder } from '../utils/enums'
import { VodProps } from '../utils/interfaces'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MusicContext = createContext<any>(undefined)
const { Provider } = MusicContext

// eslint-disable-next-line react/prop-types
const MusicProvider: FC = ({ children }) => {
	const audioRef = useRef<HTMLAudioElement>(new Audio())
	const [currIndex, setCurrIndex] = useState<number | undefined>(undefined)
	const [currSong, setCurrSong] = useState<VodProps | undefined>(undefined)
	const [currTime, setCurrTime] = useState<number>(0)
	const [currOrder, setCurrOrder] = useState<PlayOrder>(PlayOrder.Repeat)
	const [playlist, setPlaylist] = useState<VodProps[] | undefined>(undefined)

	// 初始化
	useEffect(() => {
		// 更新当前歌曲的当前时间
		const handleTimeupdate = () => setCurrTime(audioRef.current.currentTime)
		// 当前歌曲播放结束的调用
		const handleEnded = () => switchSong(1, false)
		audioRef.current.addEventListener('timeupdate', handleTimeupdate)
		audioRef.current.addEventListener('ended', handleEnded)
		return () => {
			audioRef.current.removeEventListener('timeupdate', handleTimeupdate)
			audioRef.current.removeEventListener('ended', handleEnded)
		}
	}, [currSong])

	// 通过改变currIndex的值来切歌（currIndex !== undefined是因为currIndex为0的时候也会被当成false）
	useEffect(() => {
		playlist && currIndex !== undefined && setCurrSong(playlist[currIndex])
	}, [currIndex])

	// 获取当前播放状态
	const getIsPlaying = () => !audioRef.current.paused

	// 获取当前播放源
	const getCurrSource = () => audioRef.current.src

	// 跳转
	const seek = (value: number) => (audioRef.current.currentTime = value)

	// 开始播放，因为浏览器自动播放政策的原因，这里用不了useGetPlayInfoRequest（因为hook是异步的）
	const playAudioById = (id: string) =>
		API.get(`vod/${id}`).then(({ data }) => {
			audioRef.current.src = data.playInfoList.playInfo[0].playURL
			audioRef.current.play()
			setCurrIndexById(id)
		})

	const playAudio = () => audioRef.current.play()

	// 暂停播放
	const pauseAudio = () => audioRef.current.pause()

	// 通过当前歌曲id设置当前歌曲index
	const setCurrIndexById = (id: string): boolean => {
		if (playlist) {
			const arr = playlist.filter((audio: VodProps) => audio.videoId === id)
			if (arr.length !== 0 && arr[0].cateName === '音乐') {
				setCurrIndex(playlist.indexOf(arr[0]))
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	// 切歌（+1表示切到下一首，-1表示切到上一首）
	const switchSong = (offset: number, triggerByUser: boolean) => {
		setCurrTime(0)
		audioRef.current.currentTime = 0
		if (currSong && playlist && currIndex !== undefined) {
			let songIdToPlay = undefined
			// ===循环播放 或者 单曲循环但是由用户点击按钮触发===
			if (currOrder === PlayOrder.Repeat || (currOrder === PlayOrder.RepeatOne && triggerByUser)) {
				const newIndex = currIndex + offset
				if (newIndex < 0) {
					// 到第一首歌了，切到最后一首歌
					songIdToPlay = playlist[playlist.length - 1].videoId
				} else if (newIndex > playlist.length - 1) {
					// 到最后一首歌了，切到第一首歌
					songIdToPlay = playlist[0].videoId
				} else {
					songIdToPlay = playlist[newIndex].videoId
				}
			}
			// ===单曲循环下自动重新播放===
			else if (currOrder === PlayOrder.RepeatOne && !triggerByUser) {
				audioRef.current.play()
			}
			// ===随机播放===
			else if (currOrder === PlayOrder.Shuffle) {
				// 除了当前歌曲的剩下的歌曲
				const arr = playlist.filter((audio) => audio.videoId !== currSong.videoId)
				// 其中随机选一首
				songIdToPlay = arr[Math.floor(Math.random() * arr.length)].videoId
			}
			songIdToPlay && playAudioById(songIdToPlay)
		}
	}

	// 清理audioRef
	const cleanUp = () => {
		audioRef.current.pause()
		audioRef.current.src = ''
		audioRef.current.remove()
	}

	return (
		<Provider
			value={{
				currIndex,
				currSong,
				currTime,
				currOrder,
				playlist,
				setCurrIndex,
				setCurrSong,
				setCurrTime,
				setCurrOrder,
				setPlaylist,
				getIsPlaying,
				getCurrSource,
				seek,
				playAudioById,
				playAudio,
				pauseAudio,
				setCurrIndexById,
				switchSong,
				cleanUp,
			}}
		>
			{children}
		</Provider>
	)
}

export { MusicContext, MusicProvider }
