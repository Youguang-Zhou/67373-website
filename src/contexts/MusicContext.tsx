import React, { createContext, FC, useEffect, useRef, useState } from 'react'
import { usePrevious } from 'react-use'
import { getAudioPlayURL } from '../utils/api'
import { PlayOrder } from '../utils/enums'
import { IVideo } from '../utils/interfaces'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MusicContext = createContext<any>(undefined)
const { Provider } = MusicContext

const emptyData = { coverURL: '', creationTime: '', duration: 0, title: '', videoId: '' }

// eslint-disable-next-line react/prop-types
const MusicProvider: FC = ({ children }) => {
	const audioRef = useRef<HTMLAudioElement>()
	const orderRef = useRef(PlayOrder.Repeat)
	const [playlist, setPlaylist] = useState<IVideo[]>([])
	const [isPlaying, setIsPlaying] = useState(false)
	const [currTime, setCurrTime] = useState(0)
	const [currIndex, setCurrIndex] = useState(0)
	const [currOrder, setCurrOrder] = useState(PlayOrder.Repeat)
	const [currPlayURL, setCurrPlayURL] = useState('')
	const prevSong = usePrevious(playlist[currIndex])

	// 通过改变currSongId的值来切歌
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0
			setCurrTime(0)
			setIsPlaying(false)
		}
		if (playlist[currIndex]) {
			getAudioPlayURL(playlist[currIndex].videoId).then(({ playInfoList }) => {
				const { playURL } = playInfoList.playInfo[0]
				setCurrPlayURL(playURL)
				audioRef.current = new Audio(playURL)
				audioRef.current.addEventListener('timeupdate', handleTimeupdate)
				audioRef.current.addEventListener('ended', handleEnded)
				prevSong && setIsPlaying(true)
			})
		}
		return () => {
			audioRef.current?.removeEventListener('timeupdate', handleTimeupdate)
			audioRef.current?.removeEventListener('ended', handleEnded)
		}
	}, [playlist[currIndex]])

	// 通过改变isPlaying的值来播放或暂停
	useEffect(() => {
		isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
	}, [isPlaying])

	// useState仅与页面渲染有关（且是异步的），所以要用useRef
	useEffect(() => {
		orderRef.current = currOrder
	}, [currOrder])

	// 更新当前歌曲的当前时间
	const handleTimeupdate = () => setCurrTime(audioRef.current?.currentTime || 0)

	// 当前歌曲播放结束的调用
	const handleEnded = () => switchSong(1)

	// 获取当前歌曲的详细信息
	const getCurrSongInfo = () => playlist[currIndex] || emptyData

	// 切歌（+1表示切到下一首，-1表示切到上一首）
	const switchSong = (offset: number) => {
		if (orderRef.current === PlayOrder.Repeat) {
			const newIndex = currIndex + offset
			if (newIndex < 0) {
				// 到第一首歌了，切到最后一首歌
				setCurrIndex(playlist.length - 1)
			} else if (newIndex > playlist.length - 1) {
				// 到最后一首歌了，切到第一首歌
				setCurrIndex(0)
			} else {
				setCurrIndex(newIndex)
			}
		} else if (orderRef.current === PlayOrder.RepeatOne) {
			// 单曲循环
			if (audioRef.current) {
				audioRef.current.currentTime = 0
				audioRef.current.play()
			}
		} else {
			// 除了currIndex以外的index数组
			const indicesArr = Array.from(Array(playlist.length).keys()).filter((index) => index !== currIndex)
			// 其中随机选一个index
			const randomIndex = indicesArr[Math.floor(Math.random() * indicesArr.length)]
			setCurrIndex(randomIndex)
		}
	}

	return (
		<Provider
			value={{
				audioRef,
				playlist,
				isPlaying,
				currTime,
				currIndex,
				currOrder,
				currPlayURL,
				setPlaylist,
				setIsPlaying,
				setCurrTime,
				setCurrIndex,
				setCurrOrder,
				setCurrPlayURL,
				getCurrSongInfo,
				switchSong,
			}}
		>
			{children}
		</Provider>
	)
}

export { MusicContext, MusicProvider }
