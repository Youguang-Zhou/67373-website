import React, { FC, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import AudioList from '../components/AudioList'
import MiniPlayer from '../components/MiniPlayer'
import { MusicContext } from '../contexts/MusicContext'

const Box = styled.div`
	background-color: #121212;
	color: #f8f9fa;
	padding-bottom: 6rem;
	user-select: none;
`

const MusicPage: FC = () => {
	const { currIndex, currSong, playlist, setCurrIndexById } = useContext(MusicContext)
	// const { setLyrics, shouldShowLyricView, setShouldShowLyricView } = useContext(LyricContext)
	// const { response: playlistRes } = useGetPlaylistRequest(REACT_APP_VOD_CATE_ID_AUDIO, 1, 100)
	// const { response: lyricsRes, isLoading, hasError } = useGetLyricsRequest(getCurrSongInfo().videoId)
	// const [ref, { height }] = useMeasure<HTMLElement>()
	// const NAVBAR_HEIGHT = 82.5
	const history = useHistory()
	const { id } = useParams<{ id: string }>()

	// 如果url里有id，就设置为当前歌曲，否则跳转到/music
	useEffect(() => {
		id || history.push('/music')
		if (id && playlist && currIndex === undefined) {
			setCurrIndexById(id) || history.push('/music')
		}
	}, [playlist])

	// 切歌时，url跳转到对应id
	useEffect(() => {
		currSong && history.push(`/music/${currSong.videoId}`)
	}, [currSong])

	// // 获取歌词
	// useEffect(() => {
	// 	setLyrics(lyricsRes.split('\n'))
	// }, [lyricsRes])

	// // 当显示歌词时，滚动到歌词页面。关闭歌词时则滚动到顶部
	// useEffect(() => {
	// 	scrollTo({ top: shouldShowLyricView ? height + NAVBAR_HEIGHT : 0, left: 0, behavior: 'auto' })
	// }, [shouldShowLyricView, currIndex])

	// 当底部迷你播放器点击的时候
	const handleMiniPlayerCoverClicked = () => {
		// setShouldShowLyricView(true)
		// scrollTo({ top: height + NAVBAR_HEIGHT, left: 0, behavior: 'auto' })
	}

	return (
		<Box>
			{/* <header ref={ref} className="position-relative">
				<div className="position-absolute bottom-0 d-none d-md-block m-md-3 ms-lg-5">
					<div style={{ fontSize: '5vw' }}>陈一发儿</div>
					<div className="fs-5 fst-italic">Spotify: @陈一发儿</div>
				</div>
				<Banner src={music_banner} alt="music_banner" />
			</header> */}
			<main className="p-5">
				{/* {shouldShowLyricView && <LyricView isLoading={isLoading} hasError={hasError} />} */}
				<AudioList />
			</main>
			<MiniPlayer onCoverClicked={handleMiniPlayerCoverClicked} />
		</Box>
	)
}

export default MusicPage
