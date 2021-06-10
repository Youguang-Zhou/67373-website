import React, { FC, useContext } from 'react'
import { MusicContext } from '../contexts/MusicContext'
import { IVod } from '../utils/interfaces'
import AudioCard from './AudioCard'

const AudioList: FC = () => {
	const { playlist, setCurrIndex, getCurrSongInfo } = useContext(MusicContext)

	const handleDoubleClick = (index: number) => () => setCurrIndex(index)

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
