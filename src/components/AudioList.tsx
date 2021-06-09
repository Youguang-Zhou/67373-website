import React, { FC, useContext, useEffect } from 'react'
import { MusicContext } from '../contexts/MusicContext'
import useGetPlayListRequest from '../hooks/useGetPlayListRequest'
import { IVod } from '../utils/interfaces'
import AudioCard from './AudioCard'

const { REACT_APP_VOD_CATE_ID_AUDIO } = process.env

const AudioList: FC = () => {
	const { playlist, setPlaylist, setCurrIndex, getCurrSongInfo } = useContext(MusicContext)
	const { data } = useGetPlayListRequest(REACT_APP_VOD_CATE_ID_AUDIO, 1, 100)

	const handleDoubleClick = (index: number) => () => setCurrIndex(index)

	useEffect(() => {
		data.videoList && setPlaylist(data.videoList.video)
	}, [data])

	return (
		<section className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-5">
			{playlist.map((audio: IVod, index: number) => (
				<AudioCard
					key={audio.videoId}
					audio={audio}
					highlight={getCurrSongInfo().videoId === audio.videoId}
					onDoubleClick={handleDoubleClick(index)}
				/>
			))}
		</section>
	)
}

export default AudioList
