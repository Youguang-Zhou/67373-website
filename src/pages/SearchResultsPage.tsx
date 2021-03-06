import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import fafa_nezha from '../assets/images/fafa_nezha.jpeg'
import AudioCard from '../components/AudioCard'
import Empty from '../components/Empty'
import VideoCard from '../components/VideoCard'
import useSearch from '../hooks/useSearch'
import { VodProps } from '../utils/interfaces'

const SearchResultsPage: FC = () => {
	const history = useHistory()
	const { search } = useLocation()
	const [audios, setAudios] = useState<VodProps[] | undefined>(undefined)
	const [videos, setVideos] = useState<VodProps[] | undefined>(undefined)
	const [query, setQuery] = useState<string | undefined>(undefined)
	const {
		response: { requestId, mediaList },
		isLoading,
		hasError,
	} = useSearch(query)

	useEffect(() => {
		if (search.startsWith('?query=')) {
			// 移除字符串最前面的 ?query= 字符
			setQuery(decodeURIComponent(search.slice(7)))
			// 如果没有要搜索的，就跳转回主页
			search === '?query=' && history.push('/')
		} else {
			history.push('/')
		}
	}, [search])

	useEffect(() => {
		if (mediaList) {
			setAudios(mediaList.filter(({ mediaType }) => mediaType === 'audio').map(({ audio }) => audio))
			setVideos(mediaList.filter(({ mediaType }) => mediaType === 'video').map(({ video }) => video))
		}
	}, [requestId])

	return (
		<main className="p-container">
			{hasError ? (
				<Empty error />
			) : (
				<>
					{audios && audios.length !== 0 && (
						<section className="mb-8">
							<h1 className="mb-4 text-2xl md:text-4xl">音乐单曲</h1>
							<div className="audio-container">
								{audios.map((audio: VodProps) => (
									<AudioCard key={audio.videoId} audio={audio} type="secondary" />
								))}
							</div>
						</section>
					)}
					{videos && videos.length !== 0 && (
						<section className="mb-8">
							<h1 className="mb-4 text-2xl md:text-4xl">频道视频</h1>
							<div className="video-container">
								{videos.map((video) => (
									<VideoCard key={video.videoId} video={video} openInNewTab />
								))}
							</div>
						</section>
					)}
					{videos && videos.length === 0 && audios && audios.length === 0 && !isLoading && (
						<Empty image={fafa_nezha} description="找不到搜索结果>.<!" />
					)}
				</>
			)}
		</main>
	)
}

export default SearchResultsPage
