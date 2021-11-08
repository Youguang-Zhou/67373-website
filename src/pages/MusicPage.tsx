import { useMediaQuery } from '@mui/material'
import React, { FC, useCallback, useContext, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMeasure } from 'react-use'
import music_banner from '../assets/images/music_banner.jpeg'
import AudioCard from '../components/AudioCard'
import LyricView from '../components/LyricView'
import MiniPlayer from '../components/MiniPlayer'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import useGetVodListRequest from '../hooks/useGetVodListRequest'
import { MediaType } from '../utils/enums'
import { VodProps } from '../utils/interfaces'

const MusicPage: FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const observerRef = useRef<HTMLDivElement>(null)
	const [heightRef, { height }] = useMeasure<HTMLDivElement>()
	const NAVBAR_HEIGHT = useMediaQuery('(min-width: 640px)') ? 83 : 68
	const { currIndex, currSong, playlist, setPlaylist, playAudio, setCurrIndexById, cleanUp } =
		useContext(MusicContext)
	const { shouldShowLyricView, setShouldShowLyricView } = useContext(LyricContext)
	const {
		response: { requestId, videoList },
	} = useGetVodListRequest(MediaType.Audio, 1, 100)
	const showLyricView = useCallback(
		(entries) => shouldShowLyricView && setShouldShowLyricView(entries[0].isIntersecting),
		[shouldShowLyricView]
	)

	// 切换页面时清理当前播放器
	useEffect(() => {
		return () => cleanUp()
	}, [])

	// 获取歌曲列表，并排序
	useEffect(() => {
		if (videoList) {
			const audios = videoList.video
			const originals = audios.filter(
				(audio) => audio.title === '童话镇' || audio.title === '阿婆说' || audio.title === '弦上有春秋'
			)
			const covers = audios.filter(
				(audio) => audio.title !== '童话镇' && audio.title !== '阿婆说' && audio.title !== '弦上有春秋'
			)
			setPlaylist([...originals, ...covers])
		}
	}, [requestId])

	// 如果url里有id，就设置为当前歌曲，否则跳转到/music
	useEffect(() => {
		id || navigate('/music')
		if (id && playlist && currIndex === undefined) {
			setCurrIndexById(id) ? setShouldShowLyricView(true) : navigate('/music')
		}
	}, [playlist])

	// 切歌时，url跳转到对应id
	useEffect(() => {
		if (currSong) {
			navigate(`/music/${currSong.videoId}`)
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
	const isCurrSong = (audio: VodProps) => currSong?.videoId === audio.videoId

	// 双击时调用
	const handleDoubleClick = (audio: VodProps) => {
		isCurrSong(audio) || playAudio(audio)
		setShouldShowLyricView(true)
	}

	return (
		<main className="select-none text-light bg-spotify-900">
			<div className="relative" ref={heightRef}>
				<div className="absolute bottom-0 hidden mx-12 my-4 md:block">
					<h1 className="text-vw-5">陈一发儿</h1>
					<small className="text-xl italic">Spotify: @陈一发儿</small>
				</div>
				<img className="banner" src={music_banner} alt="music_banner" />
			</div>
			<section className="pb-12 sm:pb-24 p-container">
				{currSong && (
					<div ref={observerRef}>
						<LyricView currSong={currSong} />
					</div>
				)}
				<h1 className="mb-8 text-2xl md:text-4xl">热门单曲</h1>
				<div className="audio-container">
					{playlist?.map((audio: VodProps) => (
						<AudioCard
							key={audio.videoId}
							audio={audio}
							highlight={isCurrSong(audio)}
							onDoubleClick={() => handleDoubleClick(audio)}
						/>
					))}
				</div>
			</section>
			{currSong && <MiniPlayer currSong={currSong} />}
		</main>
	)
}

export default MusicPage
