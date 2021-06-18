import { AutoComplete, Button } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import { LongestCommonSubsequence } from '../utils/functions'

const { Option } = AutoComplete

const SearchBar: FC = () => {
	const [query, setQuery] = useState('')
	const { response } = useSearch(query)
	const [searchResults, setSearchResults] = useState<string[]>([])
	const history = useHistory()
	const queryRef = useRef('')

	useEffect(() => {
		setSearchResults(
			response.mediaList
				? [...new Set(response.mediaList.map(({ audio, video }) => audio.title || video.title))]
				: []
		)
	}, [response])

	const ToSearchResultsPage = (value: string) =>
		history.push({
			pathname: '/search',
			search: `?query=${encodeURIComponent(value)}`,
		})

	return (
		<div className="d-flex align-items-center justify-content-center me-auto">
			<AutoComplete
				value={query}
				style={{ width: 'calc(12vw + 6rem)' }}
				onChange={(inputValue) => {
					setQuery(inputValue)
					queryRef.current = inputValue
				}}
				onSelect={(selectedValue) => {
					setQuery(selectedValue)
					queryRef.current = selectedValue
					ToSearchResultsPage(selectedValue)
				}}
				onKeyDown={({ key }) => key === 'Enter' && ToSearchResultsPage(queryRef.current)}
				backfill
			>
				{searchResults.map((title, index) => {
					const indexes = LongestCommonSubsequence(query, title)
					const charArr = title.split('')
					return (
						<Option key={index} value={title}>
							<span>
								{charArr.map((char, index) =>
									indexes.includes(index) ? (
										<span key={index} style={{ color: '#2196f3' }}>
											{charArr[index]}
										</span>
									) : (
										char
									)
								)}
							</span>
						</Option>
					)
				})}
			</AutoComplete>
			<Button type="primary" onClick={() => ToSearchResultsPage(query)}>
				搜索
			</Button>
		</div>
	)
}

export default SearchBar
