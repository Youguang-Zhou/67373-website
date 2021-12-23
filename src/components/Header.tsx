import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import React, { useState } from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import SearchBar from './SearchBar'

const Header = () => {
	// 移动端视角下是否折叠导航栏
	const [toggle, setToggle] = useState(false)

	return (
		<header className="p-1 md:p-3">
			{/* 桌面端 */}
			<div className="flex items-center justify-between">
				<div className="flex space-x-4">
					<Logo />
					<Navbar className="hidden space-x-4 md:flex" />
				</div>
				<SearchBar className="flex-1 hidden max-w-xs md:block" />
				<button
					type="button"
					title="使用条款"
					className="hidden px-4 text-primary md:block"
					onClick={() => open('/terms')}
				>
					{<HelpOutlineIcon />}
				</button>
				{/* 移动端logo右侧折叠导航栏的按钮 */}
				<button
					type="button"
					className="block text-gray-400 md:hidden hover:text-gray-500"
					onClick={() => setToggle(!toggle)}
				>
					{toggle ? (
						<CloseRoundedIcon fontSize="large" />
					) : (
						<MenuRoundedIcon fontSize="large" />
					)}
				</button>
			</div>
			{/* 移动端 */}
			<div
				className={`${
					toggle ? 'max-h-32' : 'max-h-0'
				} block md:hidden overflow-hidden transition-all`}
			>
				<Navbar className="flex items-center justify-evenly" />
				<SearchBar className="mb-3" />
			</div>
		</header>
	)
}

export default Header
