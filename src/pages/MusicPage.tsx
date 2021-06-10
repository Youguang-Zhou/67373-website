import React, { FC, useContext, useEffect } from 'react'
import styled from 'styled-components'
import music_banner from '../assets/images/music_banner.jpeg'
import AudioList from '../components/AudioList'
import Banner from '../components/Banner'
import LyricView from '../components/LyricView'
import MiniPlayer from '../components/MiniPlayer'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import useGetPlayListRequest from '../hooks/useGetPlayListRequest'

const { REACT_APP_VOD_CATE_ID_AUDIO } = process.env

const Box = styled.div`
	background-color: #121212;
	color: #f8f9fa;
	padding-bottom: 6rem;
	user-select: none;
`

const MusicPage: FC = () => {
	const { setPlaylist } = useContext(MusicContext)
	const { shouldShowLyricView } = useContext(LyricContext)
	const { response } = useGetPlayListRequest(REACT_APP_VOD_CATE_ID_AUDIO, 1, 100)

	useEffect(() => {
		if (response.videoList) {
			const audios = response.videoList.video
			const originals = audios.filter(
				(audio) => audio.title === '童话镇' || audio.title === '阿婆说' || audio.title === '弦上有春秋'
			)
			const covers = audios.filter(
				(audio) => audio.title !== '童话镇' && audio.title !== '阿婆说' && audio.title !== '弦上有春秋'
			)
			setPlaylist([...originals, ...covers])
		}
	}, [response])

	return (
		<Box>
			<header className="position-relative">
				<div className="position-absolute bottom-0 d-none d-md-block m-md-3 ms-lg-5">
					<div style={{ fontSize: '5vw' }}>陈一发儿</div>
					<div className="fs-5 fst-italic">Spotify: @陈一发儿</div>
				</div>
				<Banner src={music_banner} alt="music_banner" />
			</header>
			<main className="p-5">{shouldShowLyricView ? <LyricView /> : <AudioList />}</main>
			<MiniPlayer />
		</Box>
	)
}

export default MusicPage
