import React, { FC } from 'react'
import styled from 'styled-components'
import List from '../components/List'

const Container = styled.main`
	background: whitesmoke;
	padding: 30px 5%;
`

const HomePage: FC = () => (
	<Container>
		<h1 className="fw-normal">今日推荐</h1>
		<hr />
		<List />
	</Container>
)

export default HomePage
