import { BellOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/images/logo_v2.jpg'
import { getLiveTime } from '../utils/api'

const { Brand, Toggle, Collapse } = Navbar

const Logo = styled.img`
	height: 56.5px;
	width: 233.2px;

	@media (max-width: 360px) {
		height: 45.2px;
		width: 186.56px;
	}
`

const Link = styled(Nav.Link)`
	font-size: 25px;
	margin: auto 20px;
	text-align: center;
`

const Header: FC = () => {
	const { pathname } = useLocation()
	const [hasLive, setHasLive] = useState(false)

	useEffect(() => {
		getLiveTime()
			.then((data) => data && setHasLive(true))
			.catch(() => setHasLive(false))
	}, [])

	return (
		<Navbar bg="white" expand="lg">
			<Brand href="/">
				<Logo src={logo} alt="chenyifaer" />
			</Brand>
			<Toggle aria-controls="basic-navbar-nav" />
			<Collapse id="basic-navbar-nav">
				<Nav activeKey={pathname}>
					<Link href="/">首页</Link>
					<Link href="/channel">频道</Link>
					<Link href="/67373">
						<Row align="middle" justify="center">
							<span>67373</span>
							{hasLive && <BellOutlined style={{ color: '#164080c1' }} />}
						</Row>
					</Link>
				</Nav>
			</Collapse>
		</Navbar>
	)
}

export default Header
