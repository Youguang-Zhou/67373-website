import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
// import beian_icon from '../assets/images/beian_icon.png'

const StyledFooter = styled.footer`
	padding: 15px;
	text-align: center;

	span {
		color: gray;
		padding: 0px 10px;
	}

	a {
		text-decoration: none;
	}
`

const Footer: FC = () => {
	const { pathname } = useLocation()

	return (
		<StyledFooter style={{ backgroundColor: pathname === '/music' ? 'black' : 'white' }}>
			<span>{`© 2020-${new Date().getFullYear()} 67373upup.com`}</span>
			<a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
				<span>苏ICP备20007695号-1</span>
			</a>
			{/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px auto' }}>
					<a
						href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002002904"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={beian_icon} />
						<span>苏公网安备 32059002002904号</span>
					</a>
				</div> */}
		</StyledFooter>
	)
}

export default Footer
