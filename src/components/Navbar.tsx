import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined'
import React, { HTMLProps, useContext } from 'react'
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'
import { NotificationContext } from '../contexts/NotificationContext'

const navItems = [
	{ name: '首页', path: '/' },
	{ name: '频道', path: '/channel' },
	{ name: '音乐', path: '/music' },
]

const NavItem = ({ children, to }: LinkProps) => {
	const { pathname } = useResolvedPath(to)
	const isActive = useMatch({ path: `/${pathname}/*` })
	return (
		<Link
			to={to}
			className={`${
				isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
			} p-1 lg:p-3 flex items-center`}
		>
			{children}
		</Link>
	)
}

const Navbar = (props: HTMLProps<HTMLDivElement>) => {
	// 从NotificationContext中获取有无新歌
	const { hasNewSong } = useContext(NotificationContext)

	return (
		<nav {...props}>
			{navItems.map(({ name, path }, index) => (
				<NavItem key={index} to={path}>
					<span className="text-xl lg:text-2xl">{name}</span>
					{name === '音乐' && hasNewSong && (
						<FiberNewOutlinedIcon className="text-primary" fontSize="large" />
					)}
				</NavItem>
			))}
		</nav>
	)
}

export default Navbar
