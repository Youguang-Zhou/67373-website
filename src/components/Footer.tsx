import React from 'react'
import { useLocation } from 'react-router-dom'
// import beian_icon from '../assets/beian_icon.png'

const Footer = () => {
	const { pathname } = useLocation()

	return (
		<footer
			className={`py-2 text-xs sm:py-4 sm:text-sm ${
				pathname.startsWith('/music')
					? 'bg-spotify-900 text-light'
					: 'bg-white text-black text-opacity-50'
			} flex-center flex-col space-y-1 sm:flex-row sm:space-x-8`}
		>
			<span>{`© 2020-${new Date().getFullYear()} 67373upup.com`}</span>
			<span>
				<a target="_blank" rel="noopener noreferrer" href="http://beian.miit.gov.cn/">
					苏ICP备20007695号-1
				</a>
			</span>
			{/* <span>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32059002002904"
					className="flex-center"
				>
					<img src={beian_icon} />
					<span>苏公网安备 32059002002904号</span>
				</a>
			</span> */}
		</footer>
	)
}

export default Footer
