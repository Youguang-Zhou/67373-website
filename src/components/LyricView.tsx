import { useContext, useEffect, useRef } from 'react'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'
import { LYRIC_HEIGHT, MINIPLAYER_HEIGHT, NOT_SCROLL_LINE } from '../utils/constants'

interface LyricViewProps {
	song: VodProps
}

const LyricView = ({ song: { title, coverURL } }: LyricViewProps) => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const { currSong } = useContext(MusicContext)
	const { lyrics, currLine } = useContext(LyricContext)

	// 切歌时自动滚动到歌词处
	useEffect(() => {
		document.getElementById('lyric-view')?.scrollIntoView()
	}, [currSong])

	// 歌词自动滚动
	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: currLine > NOT_SCROLL_LINE ? LYRIC_HEIGHT * (currLine - NOT_SCROLL_LINE) : 0,
			behavior: 'smooth',
		})
	}, [currLine])

	return (
		<main
			id="lyric-view"
			className="flex items-center mb-8 md:space-x-8 justify-evenly"
			style={{ height: `calc(100vh - ${MINIPLAYER_HEIGHT}px)` }}
		>
			<img className="hidden w-1/3 rounded-full md:block" src={coverURL} alt={title} />
			<section className="flex flex-col items-center space-y-1 text-center h-inherit">
				<img
					alt={title}
					src={coverURL}
					className="block w-1/3 p-4 rounded-full md:hidden"
				/>
				<h1 className="text-xl font-medium tracking-wide md:text-4xl md:py-8">{title}</h1>
				<div
					ref={scrollRef}
					className="overflow-y-scroll pointer-events-none h-2/3 no-scrollbar"
				>
					{lyrics?.map((lyric: string, index: number) => (
						<div
							key={index}
							className={`${
								index === currLine - 1 ? 'text-orange-400' : 'text-light opacity-80'
							} text-sm md:text-xl py-1 md:py-2`}
						>
							{lyric.slice(11)}
						</div>
					))}
				</div>
			</section>
		</main>
	)
}

export default LyricView
