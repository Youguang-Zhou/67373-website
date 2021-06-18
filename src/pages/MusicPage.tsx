import React, { FC, useCallback, useContext, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import music_banner from '../assets/images/music_banner.jpeg'
import AudioCard from '../components/AudioCard'
import AudioList from '../components/AudioList'
import Banner from '../components/Banner'
import LyricView from '../components/LyricView'
import MiniPlayer from '../components/MiniPlayer'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import { IVod } from '../utils/interfaces'

const Box = styled.div`
	background-color: #121212;
	color: #f8f9fa;
	padding-bottom: 6rem;
	user-select: none;
`

const MusicPage: FC = () => {
	const NAVBAR_HEIGHT = 83
	const history = useHistory()
	const { id } = useParams<{ id: string }>()
	const [ref, { height }] = useMeasure<HTMLElement>()
	const { currIndex, currSong, playlist, getCurrSource, playAudioById, setCurrIndexById, cleanUp } =
		useContext(MusicContext)
	const { shouldShowLyricView, setShouldShowLyricView } = useContext(LyricContext)
	const observerRef = useRef<HTMLDivElement>(null)
	const showLyricView = useCallback(
		(entries) => shouldShowLyricView && setShouldShowLyricView(entries[0].isIntersecting),
		[shouldShowLyricView]
	)

	// 切换页面时清理当前播放器
	useEffect(() => {
		return () => cleanUp()
	}, [])

	// 如果url里有id，就设置为当前歌曲，否则跳转到/music
	useEffect(() => {
		id || history.push('/music')
		if (id && playlist && currIndex === undefined) {
			setCurrIndexById(id) ? setShouldShowLyricView(true) : history.push('/music')
		}
	}, [playlist])

	// 切歌时，url跳转到对应id
	useEffect(() => {
		if (currSong) {
			history.push(`/music/${currSong.videoId}`)
			document.title = `${currSong.title}_67373UPUP (=^ェ^=)`
		}
	}, [currSong])

	// 当显示歌词时，滚动到歌词页面
	useEffect(() => {
		currSong && shouldShowLyricView && height && scroll(0, height + NAVBAR_HEIGHT)
	}, [currSong, shouldShowLyricView, height])

	// 观察歌词页面是否可见
	useEffect(() => {
		const observer = new IntersectionObserver(showLyricView)
		currSong && observerRef.current && observer.observe(observerRef.current)
		return () => observer.disconnect()
	}, [currSong, observerRef, showLyricView])

	// 是否是当前歌曲
	const isCurrSong = (audio: IVod) => currSong?.videoId === audio.videoId

	// 双击时调用
	const handleDoubleClick = (audio: IVod) => {
		if (!isCurrSong(audio) || !getCurrSource()) {
			playAudioById(audio.videoId)
		}
		setShouldShowLyricView(true)
	}

	return (
		<Box>
			<header ref={ref} className="position-relative">
				<div className="position-absolute bottom-0 d-none d-md-block m-md-3 ms-lg-5">
					<div style={{ fontSize: '5vw' }}>陈一发儿</div>
					<div className="fs-5 fst-italic">Spotify: @陈一发儿</div>
				</div>
				<Banner src={music_banner} alt="music_banner" />
			</header>
			<main style={{ padding: '1vw 5vw' }}>
				{currSong && (
					<div ref={observerRef}>
						<LyricView />
					</div>
				)}
				<h1 className="text-light p-1 mb-3">热门单曲</h1>
				<AudioList>
					{playlist &&
						playlist.map((audio: IVod) => (
							<AudioCard
								key={audio.videoId}
								audio={audio}
								highlight={isCurrSong(audio)}
								onDoubleClick={() => handleDoubleClick(audio)}
							/>
						))}
				</AudioList>
			</main>
			<MiniPlayer />
		</Box>
	)
}

export default MusicPage
