import { BellOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/images/logo_v2.jpg'
import { getLiveTime } from '../utils/api'

const Logo = styled.img`
	height: 56.5px;
	width: 233.2px;

	@media (max-width: 360px) {
		height: 45.2px;
		width: 186.56px;
	}
`

const Header: FC = () => {
	const { pathname } = useLocation()
	const [hasLive, setHasLive] = useState(false)
	const [currNav, setCurrNav] = useState('')

	useEffect(() => {
		getLiveTime()
			.then((data) => data && setHasLive(true))
			.catch(() => setHasLive(false))
	}, [])

	useEffect(() => {
		setCurrNav(pathname)
	}, [pathname])

	return (
		<>
			{currNav && (
				<nav className="navbar navbar-expand-lg navbar-light">
					<div className="container-fluid">
						<a className="navbar-brand" href="/">
							<Logo src={logo} alt="chenyifaer" />
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#BootstrapNavbar"
							aria-controls="BootstrapNavbar"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="BootstrapNavbar">
							<div className="navbar-nav me-auto text-center fs-4">
								<a className={`nav-link ${currNav === '/' && 'active'} px-4 py-1`} href="/">
									首页
								</a>
								<a
									className={`nav-link ${currNav === '/channel' && 'active'} px-4 py-1`}
									href="/channel"
								>
									频道
								</a>
								<a
									className={`nav-link ${currNav.startsWith('/music') && 'active'} px-4 py-1`}
									href="/music"
								>
									音乐
								</a>
								<a className={`nav-link ${currNav === '/67373' && 'active'} px-4 py-1`} href="/67373">
									<Row align="middle" justify="center">
										<span>67373</span>
										{hasLive && <BellOutlined style={{ color: '#164080c1' }} />}
									</Row>
								</a>
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	)
}

export default Header
