import React, { FC, useContext, useEffect } from 'react'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import music_banner from '../assets/images/music_banner.jpeg'
import AudioList from '../components/AudioList'
import Banner from '../components/Banner'
import LyricView from '../components/LyricView'
import MiniPlayer from '../components/MiniPlayer'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import useGetLyricsRequest from '../hooks/useGetLyricsRequest'
import useGetPlaylistRequest from '../hooks/useGetPlaylistRequest'

const { REACT_APP_VOD_CATE_ID_AUDIO } = process.env

const Box = styled.div`
	background-color: #121212;
	color: #f8f9fa;
	padding-bottom: 6rem;
	user-select: none;
`

const MusicPage: FC = () => {
	const { currIndex, setPlaylist, getCurrSongInfo } = useContext(MusicContext)
	const { setLyrics, shouldShowLyricView, setShouldShowLyricView } = useContext(LyricContext)
	const { response: playlistRes } = useGetPlaylistRequest(REACT_APP_VOD_CATE_ID_AUDIO, 1, 100)
	const { response: lyricsRes, isLoading, hasError } = useGetLyricsRequest(getCurrSongInfo().videoId)
	const [ref, { height }] = useMeasure<HTMLElement>()
	const NAVBAR_HEIGHT = 82.5

	// 获取歌曲列表，并排序
	useEffect(() => {
		if (playlistRes.videoList) {
			const audios = playlistRes.videoList.video
			const originals = audios.filter(
				(audio) => audio.title === '童话镇' || audio.title === '阿婆说' || audio.title === '弦上有春秋'
			)
			const covers = audios.filter(
				(audio) => audio.title !== '童话镇' && audio.title !== '阿婆说' && audio.title !== '弦上有春秋'
			)
			setPlaylist([...originals, ...covers])
		}
	}, [playlistRes])

	// 获取歌词
	useEffect(() => {
		setLyrics(lyricsRes.split('\n'))
	}, [lyricsRes])

	// 当显示歌词时，滚动到歌词页面。关闭歌词时则滚动到顶部
	useEffect(() => {
		scrollTo({ top: shouldShowLyricView ? height + NAVBAR_HEIGHT : 0, left: 0, behavior: 'auto' })
	}, [shouldShowLyricView, currIndex])

	// 当底部迷你播放器点击的时候
	const handleMiniPlayerCoverClicked = () => {
		setShouldShowLyricView(true)
		scrollTo({ top: height + NAVBAR_HEIGHT, left: 0, behavior: 'auto' })
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
			<main className="p-5">
				{shouldShowLyricView && <LyricView isLoading={isLoading} hasError={hasError} />}
				<AudioList />
			</main>
			<MiniPlayer onCoverClicked={handleMiniPlayerCoverClicked} />
		</Box>
	)
}

export default MusicPage
