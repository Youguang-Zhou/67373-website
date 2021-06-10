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
		if (data.videoList) {
			const audios = data.videoList.video
			const originals = audios.filter(
				(audio) => audio.title === '童话镇' || audio.title === '阿婆说' || audio.title === '弦上有春秋'
			)
			const covers = audios.filter(
				(audio) => audio.title !== '童话镇' && audio.title !== '阿婆说' && audio.title !== '弦上有春秋'
			)
			setPlaylist([...originals, ...covers])
		}
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
