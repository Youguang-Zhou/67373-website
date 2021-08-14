import axios from 'axios'
import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { VodProps } from '../utils/interfaces'

const emptyData = { requestId: null, total: null, mediaList: null }

interface SearchResponseProps {
	response: {
		requestId: string | null
		total: number | null
		mediaList: Array<{
			mediaType: string
			audio: VodProps
			video: VodProps
		}> | null
	}
	isLoading: boolean
	hasError: boolean
}

const useSearch = (query: string | undefined, pageNo: number, pageSize: number): SearchResponseProps => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		const source = axios.CancelToken.source()
		if (query) {
			setIsLoading(true)
			setHasError(false)
			API.get('search', {
				params: { query: encodeURIComponent(query), pageNo: pageNo, pageSize: pageSize },
				cancelToken: source.token,
			})
				.then(({ data }) => {
					if (data) {
						// 这个接口会返回audioId，为了与VodProps同步，把audioId改回videoId
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						data.mediaList.map((media: any) => {
							if (media.mediaType === 'audio') {
								media.audio.videoId = media.audio.audioId
							}
						})
						setResponse(data)
					} else {
						setHasError(true)
					}
				})
				.catch((e) => {
					if (axios.isCancel(e)) return
					setResponse(emptyData)
					setHasError(true)
				})
				.finally(() => setIsLoading(false))
		}
		return () => source.cancel()
	}, [query])

	return { response, isLoading, hasError }
}

export default useSearch
