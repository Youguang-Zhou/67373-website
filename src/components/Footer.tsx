import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
// import beian_icon from '../assets/images/beian_icon.png'

const Footer: FC = () => {
	const { pathname } = useLocation()

	return (
		<footer
			className={`flex flex-col sm:flex-row items-center justify-center py-4 text-center ${
				pathname.startsWith('/music') ? 'bg-spotify-900 text-light' : 'bg-white text-black text-opacity-50'
			}`}
		>
			<span className="px-4">{`© 2020-${new Date().getFullYear()} 67373upup.com`}</span>
			<span className="px-4">
				<a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
					苏ICP备20007695号-1
				</a>
			</span>
			{/* <span className="px-4">
				<a
					className="flex items-center justify-center"
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
