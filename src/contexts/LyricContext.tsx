/* eslint-disable quotes */
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { durationToSeconds } from '../utils/functions'
import { MusicContext } from './MusicContext'

const data_lyrics = [
	"[00:12.75] The club isn't the best place to find a lover",
	'[00:15.06] So the bar is where I go',
	'[00:17.67] Me and my friends at the table doing shots',
	'[00:20.09] Drinking fast and then we talk slow',
	'[00:22.56] Come over and start up a conversation with just me',
	`[00:25.15] And trust me I'll give it a chance now`,
	'[00:27.44] Take my hand, stop, put Van the Man on the jukebox',
	`[00:30.14] And then we start to dance, and now I'm singing like`,
	'[00:32.77] Girl, you know I want your love',
	'[00:35.25] Your love was handmade for somebody like me',
	'[00:38.38] Come on now, follow my lead',
	`[00:40.28] I may be crazy, don't mind me`,
	`[00:42.43] Say, boy, let's not talk too much`,
	'[00:45.27] Grab on my waist and put that body on me',
	'[00:48.33] Come on now, follow my lead',
	'[00:49.87] Come, come on now, follow my lead',
	`[00:53.68] I'm in love with the shape of you`,
	'[00:56.12] We push and pull like a magnet do',
	'[00:58.63] Although my heart is falling too',
	`[01:01.17] I'm in love with your body`,
	'[01:03.78] And last night you were in my room',
	'[01:06.10] And now my bedsheets smell like you',
	'[01:08.10] Every day discovering something brand new',
	`[01:11.16] I'm in love with your body`,
	'[01:12.98] Oh—I—oh—I—oh—I—oh—I',
	`[01:16.20] I'm in love with your body`,
	'[01:17.96] Oh—I—oh—I—oh—I—oh—I',
	`[01:21.18] I'm in love with your body`,
	'[01:23.01] Oh—I—oh—I—oh—I—oh—I',
	`[01:26.36] I'm in love with your body`,
	'[01:27.94] Every day discovering something brand new',
	`[01:31.20] I'm in love with the shape of you`,
	'[01:33.09] One week in we let the story begin',
	`[01:35.04] We're going out on our first date`,
	'[01:37.53] You and me are thrifty, so go all you can eat',
	'[01:39.91] Fill up your bag and I fill up a plate',
	'[01:42.48] We talk for hours and hours about the sweet and the sour',
	'[01:45.03] And how your family is doing okay',
	'[01:47.49] Leave and get in a taxi, then kiss in the backseat',
	`[01:49.91] Tell the driver make the radio play, and I'm singing like`,
	'[01:52.79] Girl, you know I want your love',
	'[01:55.19] Your love was handmade for somebody like me',
	'[01:58.26] Come on now, follow my lead',
	`[02:00.19] I may be crazy, don't mind me`,
	`[02:02.41] Say, boy, let's not talk too much`,
	'[02:05.19] Grab on my waist and put that body on me',
	'[02:08.30] Come on now, follow my lead',
	'[02:10.11] Come, come on now, follow my lead',
	`[02:13.71] I'm in love with the shape of you`,
	'[02:16.21] We push and pull like a magnet do',
	'[02:18.61] Although my heart is falling too',
	`[02:21.21] I'm in love with your body`,
	'[02:23.66] And last night you were in my room',
	'[02:26.19] And now my bedsheets smell like you',
	'[02:28.10] Every day discovering something brand new',
	`[02:31.24] I'm in love with your body`,
	'[02:33.20] Oh—I—oh—I—oh—I—oh—I',
	`[02:36.11] I'm in love with your body`,
	'[02:37.96] Oh—I—oh—I—oh—I—oh—I',
	`[02:41.24] I'm in love with your body`,
	'[02:43.09] Oh—I—oh—I—oh—I—oh—I',
	`[02:46.17] I'm in love with your body`,
	'[02:48.15] Every day discovering something brand new',
	`[02:51.15] I'm in love with the shape of you`,
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LyricContext = createContext<any>(undefined)
const { Provider } = LyricContext

// eslint-disable-next-line react/prop-types
const LyricProvider: FC = ({ children }) => {
	const [lyrics, setLyrics] = useState(data_lyrics)
	const [currLine, setCurrLine] = useState(0)
	const [shouldShowLyricView, setShouldShowLyricView] = useState(false)
	const { currTime, currIndex } = useContext(MusicContext)

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

	useEffect(() => {
		setCurrLine(0)
	}, [currIndex])

	return (
		<Provider value={{ lyrics, currLine, shouldShowLyricView, setLyrics, setCurrLine, setShouldShowLyricView }}>
			{children}
		</Provider>
	)
}

export { LyricContext, LyricProvider }
