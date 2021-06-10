import React, { FC } from 'react'
import styled from 'styled-components'
import music_banner from '../assets/images/music_banner.jpeg'
import AudioList from '../components/AudioList'
import Banner from '../components/Banner'
import MiniPlayer from '../components/MiniPlayer'
import { MusicProvider } from '../contexts/MusicContext'

const Main = styled.main`
	background-color: #121212;
	color: #f8f9fa;
	padding-bottom: 6rem;
	user-select: none;
`

const MusicPage: FC = () => (
	<MusicProvider>
		<Main>
			<header className="position-relative">
				<div className="position-absolute bottom-0 d-none d-md-block m-md-3 ms-lg-5">
					<div style={{ fontSize: '5vw' }}>陈一发儿</div>
					<div className="fs-5 fst-italic">Spotify: @陈一发儿</div>
				</div>
				<Banner src={music_banner} alt="music_banner" />
			</header>
			<section className="p-5">
				<AudioList />
			</section>
			<MiniPlayer />
		</Main>
	</MusicProvider>
)

export default MusicPage
