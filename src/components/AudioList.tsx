import React, { FC, useContext } from 'react'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import { IVod } from '../utils/interfaces'
import AudioCard from './AudioCard'
import AudioCardSmall from './AudioCardSmall'

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
		<>
			{/* 桌面端尺寸 */}
			<section className="d-none d-sm-flex row row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-5">
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
			{/* 移动端尺寸 */}
			<section className="container d-block d-sm-none">
				{playlist &&
					playlist.map((audio: IVod) => (
						<>
							<AudioCardSmall
								key={audio.videoId}
								audio={audio}
								highlight={isClickCurrSong(audio)}
								onDoubleClick={() => handleDoubleClick(audio)}
							/>
							<hr className="mx-0 my-0" />
						</>
					))}
			</section>
		</>
	)
}

export default AudioList
