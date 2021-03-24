import React, { FC } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo_v2.jpg'

const { Brand, Toggle, Collapse } = Navbar

const Logo = styled.img`
	height: 56.5px;
	width: 233.2px;
`

const Link = styled(Nav.Link)`
	font-size: 25px;
	margin: auto 20px;
	text-align: center;
`

const Header: FC = () => {
	const { pathname } = useLocation()

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
					<Link href="/67373">67373</Link>
				</Nav>
			</Collapse>
		</Navbar>
	)
}

export default Header
