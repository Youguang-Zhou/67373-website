import { AutoComplete, AutoCompleteProps, Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import useSearch from '../hooks/useSearch'
import { LongestCommonSubsequence } from '../utils/functions'

const { Option } = AutoComplete

const SearchBar: FC<AutoCompleteProps> = ({ style }: AutoCompleteProps) => {
	const [query, setQuery] = useState('')
	const { response } = useSearch(query)
	const [searchResults, setSearchResults] = useState<string[]>([])

	useEffect(() => {
		setSearchResults(
			response.mediaList
				? [...new Set(response.mediaList.map(({ audio, video }) => audio.title || video.title))]
				: []
		)
	}, [response])

	const handleInputValueChange = (inputValue: string) => setQuery(inputValue)

	const handleAutoCompleteSearch = (value: string) => console.log('onSearch', value)

	const handleAutoCompleteSelect = (value: string) => console.log('onSelect', value)

	return (
		<>
			<AutoComplete
				backfill
				style={style}
				onChange={handleInputValueChange}
				onSearch={handleAutoCompleteSearch}
				onSelect={handleAutoCompleteSelect}
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
			<Button type="primary">搜索</Button>
		</>
	)
}

export default SearchBar
