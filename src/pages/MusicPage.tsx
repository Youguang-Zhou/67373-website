import React, { FC } from 'react'
import styled from 'styled-components'
import music_banner from '../assets/images/music_banner.jpeg'
import Banner from '../components/Banner'
import AudioList from '../components/MusicPage/AudioList'
import MiniPlayer from '../components/MusicPage/MiniPlayer'
import { MusicProvider } from '../contexts/MusicContext'

const Container = styled.div`
	user-select: none;
`

const Header = styled.header`
	position: relative;
`

const Main = styled.main`
	background: linear-gradient(to bottom, #602560, black);
	padding: 3vw;
`

const TitleBox = styled.div`
	bottom: 1vw;
	color: white;
	left: 3vw;
	position: absolute;
`

const BigTitle = styled.div`
	font-size: 5vw;
`

const SmallTitle = styled.div`
	font-size: 1vw;
	font-style: italic;
	margin-left: 3px;
`

const MusicPage: FC = () => (
	<MusicProvider>
		<Container>
			<Header>
				<Banner src={music_banner} alt="music_banner" />
				<TitleBox>
					<BigTitle>陈一发儿</BigTitle>
					<SmallTitle>Spotify: @陈一发儿</SmallTitle>
				</TitleBox>
			</Header>
			<Main>
				<AudioList />
			</Main>
			<MiniPlayer />
		</Container>
	</MusicProvider>
)

export default MusicPage
