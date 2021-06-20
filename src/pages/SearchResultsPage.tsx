import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import fafa_nezha from '../assets/images/fafa_nezha.jpeg'
import AudioCard from '../components/AudioCard'
import AudioList from '../components/AudioList'
import Empty from '../components/Empty'
import VideoCard from '../components/VideoCard'
import useSearch from '../hooks/useSearch'
import { VodProps } from '../utils/interfaces'

const SearchResultsPage: FC = () => {
	const [audios, setAudios] = useState<VodProps[] | undefined>(undefined)
	const [videos, setVideos] = useState<VodProps[] | undefined>(undefined)
	const [query, setQuery] = useState<string | undefined>(undefined)
	const { response, isLoading, hasError } = useSearch(query)
	const { search } = useLocation()
	const history = useHistory()

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
		const { mediaList } = response
		if (mediaList) {
			setAudios(mediaList.filter(({ mediaType }) => mediaType === 'audio').map(({ audio }) => audio))
			setVideos(mediaList.filter(({ mediaType }) => mediaType === 'video').map(({ video }) => video))
		}
	}, [response])

	return (
		<main style={{ padding: '1vw 5vw' }}>
			{hasError ? (
				<Empty error />
			) : (
				<>
					{audios && audios.length !== 0 && (
						<div className="mb-5">
							<h1>音乐单曲</h1>
							<AudioList>
								{audios &&
									audios.map((audio: VodProps) => (
										<AudioCard
											key={audio.videoId}
											audio={audio}
											variant="light"
											onClick={() => open(`music/${audio.videoId}`)}
										/>
									))}
							</AudioList>
						</div>
					)}
					{videos && videos.length !== 0 && (
						<div className="mb-5">
							<h1>频道视频</h1>
							<section className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
								{videos.map((video) => (
									<VideoCard key={video.videoId} video={video} />
								))}
							</section>
						</div>
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
