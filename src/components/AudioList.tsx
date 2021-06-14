import React, { FC, useContext } from 'react'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import { IVod } from '../utils/interfaces'
import AudioCard from './AudioCard'

const AudioList: FC = () => {
	const { currSong, playlist, getCurrSource, playAudioById } = useContext(MusicContext)
	const { setShouldShowLyricView } = useContext(LyricContext)

	const isClickCurrSong = (audio: IVod) => currSong && currSong.videoId === audio.videoId

	const handleDoubleClick = (audio: IVod) => {
		if (!isClickCurrSong(audio) || !getCurrSource()) {
			playAudioById(audio.videoId)
		}
		setShouldShowLyricView(true)
	}

	return (
		<section className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-5">
			{playlist &&
				playlist.map((audio: IVod) => (
					<AudioCard
						key={audio.videoId}
						audio={audio}
						highlight={isClickCurrSong(audio)}
						onDoubleClick={() => handleDoubleClick(audio)}
					/>
				))}
		</section>
	)
}

export default AudioList
