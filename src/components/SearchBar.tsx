import React, { HTMLProps, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { getSearchResults } from '../utils/api'
import { LongestCommonSubsequence } from '../utils/functions'

const SearchBar = ({ className }: HTMLProps<HTMLDivElement>) => {
	// 输入框里的内容
	const [query, setQuery] = useState<string | undefined>()
	// 输入框的Ref
	const inputRef = useRef<HTMLInputElement>(null)
	// 当前焦点是否在输入框
	const [isFocus, setIsFocus] = useState<boolean>(false)
	// 下拉框的索引
	const [selectedIndex, setSelectedIndex] = useState<number | undefined>()
	// 下拉框的搜索结果
	const [searchResults, setSearchResults] = useState<string[]>([])
	// 搜索结果的api调用
	const { data } = useQuery(['search', query], () => getSearchResults(query, 1, 100))

	// 获取搜索结果
	useEffect(() => {
		if (!data?.mediaList) return
		setSearchResults([
			...Array.from(
				// 用Set去除重复歌曲名
				new Set(data.mediaList.map(({ audio, video }) => audio.title || video.title))
			),
		])
	}, [data])

	// 键盘上下键选择搜索结果时，固定光标在字符串末尾
	useEffect(() => {
		if (!inputRef.current || !query) return
		inputRef.current.setSelectionRange(inputRef.current?.value.length, query.length)
	}, [selectedIndex])

	// 键盘上下键选择搜索结果
	const handleKeyboardEvent = ({ key }: KeyboardEvent<HTMLInputElement>) => {
		let index = selectedIndex
		switch (key) {
			case 'ArrowUp':
				if (index === undefined) {
					index = searchResults.length - 1
				} else {
					index - 1 < 0 ? (index = searchResults.length - 1) : (index -= 1)
				}
				break
			case 'ArrowDown':
				if (index === undefined) {
					index = 0
				} else {
					index + 1 === searchResults.length ? (index = 0) : (index += 1)
				}
				break
			case 'Enter':
				if (index == undefined) {
					navigate(inputRef.current?.value)
				} else {
					navigate(searchResults[index])
				}
				break
			default:
				break
		}
		setSelectedIndex(index)
	}

	// 渲染搜索结果的下拉框
	const renderDropdownMenu = () =>
		query &&
		searchResults.map((title, index) => {
			const indexes = LongestCommonSubsequence(query, title)
			const charArr = title.split('')
			return (
				<div
					key={index}
					className={`${
						selectedIndex === index ? 'bg-gray-100' : ''
					} px-3 py-2 cursor-pointer`}
					onMouseOver={() => setSelectedIndex(index)}
					onMouseDown={() => navigate(searchResults[index])}
				>
					{charArr.map((char, index) =>
						indexes.includes(index) ? (
							<span key={index} className="text-blue-400">
								{charArr[index]}
							</span>
						) : (
							<span key={index}>{char}</span>
						)
					)}
				</div>
			)
		})

	// 跳转到搜索结果页面
	const navigate = (value: string | undefined) => {
		inputRef.current?.blur()
		value && open(`/search?q=${value}`)
	}

	return (
		<div className={`relative mx-2 text-sm ${className}`}>
			<div
				className={`h-8 px-3 ${
					query && isFocus && searchResults.length > 0
						? 'md:rounded-b-none md:border-b-0'
						: ''
				} 
				flex items-center border border-gray-200 shadow rounded-2xl`}
			>
				<input
					type="text"
					maxLength={30}
					ref={inputRef}
					className="flex-1 outline-none"
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onKeyDown={handleKeyboardEvent}
					onChange={({ target: { value } }) => setQuery(value)}
				/>
				<button onClick={() => navigate(query)}>🔍</button>
			</div>
			{/* 自动补全（在小尺寸屏幕默认隐藏） */}
			{query && isFocus && searchResults.length > 0 && (
				<div className="absolute z-50 hidden w-full overflow-hidden bg-white border border-t-0 border-gray-200 shadow md:block rounded-b-2xl">
					{renderDropdownMenu()}
				</div>
			)}
		</div>
	)
}

export default SearchBar
