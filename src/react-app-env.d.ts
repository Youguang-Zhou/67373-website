/// <reference types="react-scripts" />

declare interface VodProps {
	videoId: string
	title: string
	duration: number
	description: string
	cateName: string
	coverURL: string
	creationTime: string
}

declare interface VideoCardProps {
	type?: 'primary' | 'secondary'
	video: VodProps
	newTab?: boolean
}

declare interface NotificationProviderProps {
	hasNewSong: boolean
}

declare interface GetVodListResponseProps {
	requestId: string | null
	total: number | null
	videoList: { video: VodProps[] } | null
	nextPage: number | null
}

declare interface SearchResponseProps {
	requestId: string | null
	total: number | null
	mediaList: Array<{
		mediaType: string
		audio: VodProps
		video: VodProps
	}> | null
}

declare interface InfiniteScrollProps {
	children?: ReactNode
	hasMore: boolean | undefined
	hasError: boolean
	isLoading: boolean
	loadMore: () => void
}

declare interface EmptyProps {
	error?: boolean
	image?: string
	description?: string
}
