import React, { FC } from 'react'
import styled from 'styled-components'
import VideoList from '../components/VideoList'

const Container = styled.main`
	background: whitesmoke;
	padding: 30px 5%;
`

const HomePage: FC = () => (
	<Container>
		<span style={{ fontSize: 'xx-large' }}>今日推荐</span>
		<hr className="m-0" />
		<VideoList />
	</Container>
)

export default HomePage
