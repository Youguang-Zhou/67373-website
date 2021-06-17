import axios from 'axios'
import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { IVod } from '../utils/interfaces'

const emptyData = { requestId: null, total: null, mediaList: null }

interface ISearch {
	response: {
		requestId: string | null
		total: number | null
		mediaList: Array<{
			mediaType: string
			audio: {
				audioId: string
				cateName: string
				coverURL: string
				creationTime: string
				duration: number
				title: string
			}
			video: IVod
		}> | null
	}
	isLoading: boolean
	hasError: boolean
}

const useSearch = (query: string | undefined): ISearch => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		const source = axios.CancelToken.source()
		if (query) {
			setIsLoading(true)
			setHasError(false)
			API.get('search', {
				params: { query: query },
				cancelToken: source.token,
			})
				.then(({ data }) => (data ? setResponse(data) : setHasError(true)))
				.catch((e) => {
					if (axios.isCancel(e)) return
					setResponse(emptyData)
					setHasError(true)
				})
				.finally(() => setIsLoading(false))
		} else {
			setResponse(emptyData)
			setHasError(true)
		}
		return () => source.cancel()
	}, [query])

	return { response, isLoading, hasError }
}

export default useSearch
