import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import fafa_nezha from '../assets/fafa_nezha.jpeg'
import AudioCard from '../components/AudioCard'
import Empty from '../components/Empty'
import VideoCard from '../components/VideoCard'
import { getSearchResults } from '../utils/api'

const SearchResultsPage = () => {
	const navigate = useNavigate()
	const { search } = useLocation()
	const [query, setQuery] = useState<string>()
	const [audios, setAudios] = useState<VodProps[]>()
	const [videos, setVideos] = useState<VodProps[]>()
	const {
		isError,
		isLoading,
		data: { mediaList } = {},
	} = useQuery(['search', query], () => getSearchResults(query, 1, 100), {
		enabled: !!query,
	})

	useEffect(() => {
		if (search.startsWith('?q=')) {
			// 移除字符串最前面的 ?q= 字符
			setQuery(decodeURIComponent(search.slice(3)))
			// 如果没有要搜索的，就跳转回主页
			search === '?q=' && navigate('/')
		} else {
			navigate('/')
		}
	}, [search])

	useEffect(() => {
		setAudios(
			mediaList?.filter(({ mediaType }) => mediaType === 'audio').map(({ audio }) => audio)
		)
		setVideos(
			mediaList?.filter(({ mediaType }) => mediaType === 'video').map(({ video }) => video)
		)
	}, [mediaList])

	return (
		<main className="main-container">
			{isError ? (
				<Empty error />
			) : (
				<>
					{audios && audios.length !== 0 && (
						<section className="mb-8">
							<h1 className="mb-4 text-2xl md:text-4xl">音乐单曲</h1>
							<div className="audio-container">
								{audios.map((audio: VodProps) => (
									<AudioCard
										key={audio.videoId}
										audio={audio}
										type="secondary"
										onSingleClick={() => open(`/music/${audio.videoId}`)}
										onDoubleClick={() => open(`/music/${audio.videoId}`)}
									/>
								))}
							</div>
						</section>
					)}
					{videos && videos.length !== 0 && (
						<section className="mb-8">
							<h1 className="mb-4 text-2xl md:text-4xl">频道视频</h1>
							<div className="video-container">
								{videos.map((video) => (
									<VideoCard key={video.videoId} video={video} />
								))}
							</div>
						</section>
					)}
					{videos &&
						videos.length === 0 &&
						audios &&
						audios.length === 0 &&
						!isLoading && <Empty image={fafa_nezha} description="找不到搜索结果>.<!" />}
				</>
			)}
		</main>
	)
}

export default SearchResultsPage
