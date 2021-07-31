import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded'
import YouTubeIcon from '@material-ui/icons/YouTube'
import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/images/logo_v2.jpg'
import useGetLiveInfoRequest from '../hooks/useGetLiveInfoRequest'
import { LiveStatus } from '../utils/enums'
import SearchBar from './SearchBar'

const navItems = [
	{ name: '首页', path: '/' },
	{ name: '频道', path: '/channel' },
	{ name: '音乐', path: '/music' },
	{ name: '67373', path: '/67373' },
]

const Header: FC = () => {
	const [currPath, setCurrPath] = useState<string>('')
	const [toggle, setToggle] = useState<boolean>(false)
	const { pathname } = useLocation()
	const {
		response: { status },
	} = useGetLiveInfoRequest()

	useEffect(() => {
		setCurrPath(pathname)
	}, [pathname])

	const renderNavItems = () =>
		navItems.map(({ name, path }, index) => (
			<a
				key={index}
				className={`${
					(currPath === path && path === '/') || (currPath.startsWith(path) && path !== '/')
						? 'text-gray-900 hover:text-gray-900'
						: 'hover:text-gray-700'
				} text-xl md:text-2xl text-gray-500 p-1 md:p-3`}
				href={path}
			>
				{/* 如果是67373页面后面会附上直播状态的图标 */}
				{name === '67373' ? (
					<div className="flex items-center justify-center space-x-0.5">
						<span>{name}</span>
						{status === LiveStatus.WillStart && <NotificationsNoneRoundedIcon className="text-primary" />}
						{status === LiveStatus.IsLive && <YouTubeIcon className="text-primary" />}
					</div>
				) : (
					<span>{name}</span>
				)}
			</a>
		))

	return (
		<header className="px-1 lg:px-4">
			{/* 桌面端 */}
			<div className="flex items-center justify-between h-16 lg:h-20">
				<div className="flex flex-shrink-0 space-x-0 lg:space-x-8">
					{/* logo */}
					<a className="flex items-center" href="/">
						<img className="h-12 lg:h-14" src={logo} alt="ChenYiFaer" />
					</a>
					{/* 桌面端的导航栏 */}
					<nav className="items-center justify-center hidden md:flex md:space-x-1 lg:space-x-4">
						{renderNavItems()}
					</nav>
				</div>
				{/* 桌面端的搜索栏 */}
				<SearchBar className="flex-1 hidden max-w-xs md:block" />
				{/* 问题反馈按钮 */}
				<button
					type="button"
					title="使用条款"
					className="hidden px-2 text-primary text-opacity-70 lg:block"
					onClick={() => open('/terms')}
				>
					{<HelpOutlineIcon />}
				</button>
				{/* 移动端logo右侧显示导航栏的按钮 */}
				<button
					type="button"
					className="block text-gray-400 md:hidden hover:text-gray-500"
					onClick={() => setToggle(!toggle)}
				>
					{toggle ? <CloseRoundedIcon fontSize="large" /> : <MenuRoundedIcon fontSize="large" />}
				</button>
			</div>
			{/* 移动端 */}
			<div className={`block overflow-hidden transition-all ${toggle ? 'max-h-32' : 'max-h-0'} md:hidden`}>
				<nav className="flex items-center justify-evenly">{renderNavItems()}</nav>
				<SearchBar className="mb-3" />
			</div>
		</header>
	)
}

export default Header
