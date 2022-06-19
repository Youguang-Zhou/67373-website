import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import banner_music from '../assets/banner_music.jpeg'
import AudioCard from '../components/AudioCard'
import { MusicContext } from '../contexts/MusicContext'
import { isRecentPublished } from '../utils/functions'

const MusicPage = () => {
	const navigate = useNavigate()
	const { playlist, currSong } = useContext(MusicContext)

	const handleClick = (audio: VodProps, type: 'single' | 'double') => {
		const path = `/music/${audio.videoId}`
		type === 'single' && open(path)
		type === 'double' && navigate(path)
	}

	return (
		<main className="select-none text-light bg-spotify-900">
			<div className="relative">
				<div className="absolute bottom-0 hidden mx-12 my-4 md:block">
					<h1 style={{ fontSize: '5vw' }}>陈一发儿</h1>
					<small className="text-xl italic">Spotify: @陈一发儿</small>
				</div>
				<img className="banner" src={banner_music} alt="banner_music" />
			</div>
			<section className="pb-12 sm:pb-24 main-container">
				<Outlet />
				<h1 className="mb-8 text-2xl md:text-4xl">热门单曲</h1>
				<div className="audio-container">
					{playlist.map((audio) => (
						<AudioCard
							key={audio.videoId}
							audio={audio}
							isNewSong={isRecentPublished(audio.creationTime)}
							highlight={audio.videoId === currSong?.videoId}
							onSingleClick={() => handleClick(audio, 'single')}
							onDoubleClick={() => handleClick(audio, 'double')}
						/>
					))}
				</div>
			</section>
		</main>
	)
}

export default MusicPage
