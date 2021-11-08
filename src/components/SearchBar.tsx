import React, { ChangeEvent, FC, HTMLProps, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import { LongestCommonSubsequence } from '../utils/functions'

const SearchBar: FC<HTMLProps<HTMLDivElement>> = ({ className }: HTMLProps<HTMLDivElement>) => {
	const [query, setQuery] = useState<string>('')
	const [input, setInput] = useState<string>('')
	const [isFocus, setIsFocus] = useState<boolean>(false)
	const [isComposition, setIsComposition] = useState<boolean>(false)
	const [selectedIndex, setSelectedIndex] = useState<number | undefined>()
	const [searchResults, setSearchResults] = useState<string[]>([])
	const { search } = useLocation()
	const navigate = useNavigate()
	const inputRef = useRef<HTMLInputElement>(null)
	const {
		response: { mediaList },
	} = useSearch(query, 1, 100)

	useEffect(() => {
		setInput(decodeURIComponent(search.slice(7)))
	}, [])

	useEffect(() => {
		setSearchResults(mediaList ? [...new Set(mediaList.map(({ audio, video }) => audio.title || video.title))] : [])
	}, [mediaList])

	// 键盘上下键选择搜索结果时，固定光标在字符串末尾
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.setSelectionRange(inputRef.current?.value.length, input.length)
			inputRef.current.value = input
		}
	}, [input])

	const handleInputValueChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setQuery(value)
		setSelectedIndex(undefined)
		!isComposition && setInput(value)
	}

	const handleKeyboardEvent = ({ key }: KeyboardEvent<HTMLInputElement>) => {
		let index = selectedIndex
		switch (key) {
			case 'ArrowUp':
				if (index === undefined) {
					index = searchResults.length - 1
				} else {
					index - 1 < 0 ? (index = searchResults.length - 1) : (index -= 1)
				}
				setSelectedIndex(index)
				setInput(searchResults[index])
				break
			case 'ArrowDown':
				if (index === undefined) {
					index = 0
				} else {
					index + 1 === searchResults.length ? (index = 0) : (index += 1)
				}
				setSelectedIndex(index)
				setInput(searchResults[index])
				break
			case 'Enter':
				toSearchResultsPage(inputRef.current?.value)
				inputRef.current?.blur()
				break
			default:
				break
		}
	}

	const toSearchResultsPage = (value: string | undefined) => {
		if (value) {
			setInput(value)
			navigate({ pathname: '/search', search: `?q=${value}` })
		}
	}

	return (
		<div className={`${className} relative text-sm`}>
			<div
				className={`flex items-center h-8 px-3 border border-gray-200 shadow rounded-2xl ${
					isFocus && query && searchResults.length !== 0 ? 'md:rounded-b-none md:border-b-0' : ''
				}`}
			>
				<input
					type="text"
					ref={inputRef}
					maxLength={30}
					className="flex-1 outline-none"
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onKeyDown={handleKeyboardEvent}
					onChange={handleInputValueChanged}
					onCompositionStart={() => setIsComposition(true)}
					onCompositionEnd={() => setIsComposition(false)}
				/>
				<button className="opacity-70" onClick={() => toSearchResultsPage(inputRef.current?.value)}>
					🔍
				</button>
			</div>
			{/* 自动补全（在小尺寸屏幕默认隐藏） */}
			{isFocus && query && searchResults.length !== 0 && (
				<div className="absolute z-50 hidden w-full overflow-hidden bg-white border border-t-0 border-gray-200 shadow md:block rounded-b-2xl">
					{searchResults.map((title, index) => {
						const indexes = LongestCommonSubsequence(query, title)
						const charArr = title.split('')
						return (
							<div
								key={index}
								className={`${selectedIndex === index ? 'bg-gray-100' : ''} px-3 py-2 cursor-pointer`}
								onMouseOver={() => setSelectedIndex(index)}
								onMouseDown={() => toSearchResultsPage(searchResults[index])}
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
					})}
				</div>
			)}
		</div>
	)
}

export default SearchBar
