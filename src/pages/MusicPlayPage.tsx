import { useDocumentTitle } from '@react-hookz/web'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LyricView from '../components/LyricView'
import MiniPlayer from '../components/MiniPlayer'
import { MusicContext } from '../contexts/MusicContext'
import { DocTitleWrapper } from '../utils/functions'

const MusicPlayPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const observerRef = useRef<HTMLDivElement>(null)
	const [shouldShowLyrics, setShouldShowLyrics] = useState(true)
	const { playlist, currSong, setCurrSong, initializePlayer, cleanUpPlayer } =
		useContext(MusicContext)
	const showLyricView = useCallback(
		(entries: IntersectionObserverEntry[]) => setShouldShowLyrics(entries[0].isIntersecting),
		[]
	)

	useDocumentTitle(currSong?.title || '', { wrapper: DocTitleWrapper, restoreOnUnmount: true })

	// 设置当前歌曲
	useEffect(() => {
		playlist.map((audio) => {
			if (audio.videoId === id) {
				initializePlayer(audio)
				setCurrSong(audio)
			}
		})
		return () => cleanUpPlayer()
	}, [id, playlist])

	// 切歌时，url跳转到对应id
	useEffect(() => {
		currSong && currSong.videoId !== id && navigate(`/music/${currSong.videoId}`)
	}, [currSong])

	// 判断是否应该高亮歌词按钮
	useEffect(() => {
		const observer = new IntersectionObserver(showLyricView)
		currSong && observerRef.current && observer.observe(observerRef.current)
		return () => observer.disconnect()
	}, [currSong, observerRef, showLyricView])

	return (
		<>
			{currSong && (
				<>
					<div ref={observerRef}>
						<LyricView song={currSong} />
					</div>
					<MiniPlayer song={currSong} highlight={shouldShowLyrics} />
				</>
			)}
		</>
	)
}

export default MusicPlayPage
