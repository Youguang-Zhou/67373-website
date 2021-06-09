import React, { FC } from 'react'
import styled from 'styled-components'
import music_banner from '../assets/images/music_banner.jpeg'
import AudioList from '../components/AudioList'
import Banner from '../components/Banner'
import MiniPlayer from '../components/MiniPlayer'
import { MusicProvider } from '../contexts/MusicContext'

const Main = styled.main`
	background: linear-gradient(to bottom, #602560, black);
	padding: 3vw;
`

const MusicPage: FC = () => (
	<MusicProvider>
		<div className="text-light user-select-none">
			<header className="position-relative">
				<div className="position-absolute bottom-0 d-none d-md-block m-md-3 ms-lg-5">
					<div style={{ fontSize: '5vw' }}>陈一发儿</div>
					<div className="fs-5 fst-italic">Spotify: @陈一发儿</div>
				</div>
				<Banner src={music_banner} alt="music_banner" />
			</header>
			<Main>
				<AudioList />
			</Main>
			<MiniPlayer />
		</div>
	</MusicProvider>
)

export default MusicPage
