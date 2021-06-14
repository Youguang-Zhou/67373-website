/* eslint-disable quotes */
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import useGetLyricsRequest from '../hooks/useGetLyricsRequest'
import { durationToSeconds } from '../utils/functions'
import { MusicContext } from './MusicContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LyricContext = createContext<any>(undefined)
const { Provider } = LyricContext

// eslint-disable-next-line react/prop-types
const LyricProvider: FC = ({ children }) => {
	const [lyrics, setLyrics] = useState<string[]>([])
	const [currLine, setCurrLine] = useState<number>(0)
	const [shouldShowLyricView, setShouldShowLyricView] = useState<boolean>(false)
	const { currIndex, currSong, currTime } = useContext(MusicContext)
	const { response: lyricsRes, isLoading, hasError } = useGetLyricsRequest(currSong?.videoId)

	// 获取歌词
	useEffect(() => {
		setLyrics(lyricsRes.split('\n'))
	}, [lyricsRes])

	// 根据当前时间（currTime）计算当前歌词行数
	// currTime的单位：秒，
	// 每一行歌词的格式为：[mm:ss.xx] 听说白雪公主在逃跑
	useEffect(() => {
		if (currLine < lyrics.length) {
			currTime === 0 && setCurrLine(0)
			// 转为hh:mm:ss格式，方便计算
			const time = durationToSeconds(`00:${lyrics[currLine].slice(1, 6)}`)
			currTime >= time && setCurrLine(currLine + 1)
		}
	}, [currTime])

	// 切歌时重置歌词行数
	useEffect(() => {
		setCurrLine(0)
	}, [currIndex])

	return (
		<Provider
			value={{
				lyrics,
				currLine,
				shouldShowLyricView,
				setLyrics,
				setCurrLine,
				setShouldShowLyricView,
				isLoading,
				hasError,
			}}
		>
			{children}
		</Provider>
	)
}

export { LyricContext, LyricProvider }
