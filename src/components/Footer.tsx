import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
// import beian_icon from '../assets/images/beian_icon.png'

const Footer: FC = () => {
	const { pathname } = useLocation()

	return (
		<footer
			className="text-center py-3"
			style={{
				backgroundColor: pathname === '/music' ? '#121212' : 'white',
				color: pathname === '/music' ? '#fafafafa' : '#00000080',
			}}
		>
			<span className="px-3">{`© 2020-${new Date().getFullYear()} 67373upup.com`}</span>
			<span className="px-3 d-block d-sm-inline-block">
				<a
					className="text-reset text-decoration-none"
					href="http://beian.miit.gov.cn/"
					target="_blank"
					rel="noopener noreferrer"
				>
					苏ICP备20007695号-1
				</a>
			</span>
			{/* <span className="px-3 d-block d-sm-inline-block">
				<a
					className="text-reset text-decoration-none"
					href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002002904"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={beian_icon} />
					<span>苏公网安备 32059002002904号</span>
				</a>
			</span> */}
		</footer>
	)
}

export default Footer
