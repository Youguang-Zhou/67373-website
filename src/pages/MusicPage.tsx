import React, { FC } from 'react'
import styled from 'styled-components'
import music_banner from '../assets/images/music_banner.jpeg'
import Banner from '../components/Banner'

const Title = styled.h1`
	bottom: 1vw;
	color: white;
	font-size: 5vw;
	left: 3vw;
	position: absolute;
`

const MusicPage: FC = () => (
	<>
		<div style={{ position: 'relative' }}>
			<Banner src={music_banner} alt="music_banner" />
			<Title>陈一发儿</Title>
		</div>
	</>
)

export default MusicPage
