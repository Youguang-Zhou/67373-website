import { useMediaQuery } from '@material-ui/core'
import React, { FC, useContext, useEffect, useRef } from 'react'
import { LyricContext } from '../contexts/LyricContext'
import { VodProps } from '../utils/interfaces'

interface LyricViewProps {
	currSong: VodProps
}

const LyricView: FC<LyricViewProps> = ({ currSong: { title, coverURL } }: LyricViewProps) => {
	const LYRIC_HEIGHT = useMediaQuery('(min-width: 640px)') ? 44 : 36 // 每行歌词高度
	const NOT_SCROLL_LINE = 6 // 前几行先不滚动
	const scrollRef = useRef<HTMLDivElement>(null)
	const { lyrics, currLine, isLoading, hasError } = useContext(LyricContext)

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scroll({
				top: currLine > NOT_SCROLL_LINE ? LYRIC_HEIGHT * (currLine - NOT_SCROLL_LINE) : 0,
				left: 0,
				behavior: 'smooth',
			})
		}
	}, [currLine])

	return (
		<section className="flex flex-col items-center justify-center pb-16 md:pb-48 md:flex-row md:pt-8">
			<div className="w-1/3 pb-4 md:pb-0">
				<img className="rounded-full" src={coverURL} alt={title} />
			</div>
			<div className="w-full text-center md:w-1/2">
				<h1 className="mb-6 text-4xl font-medium tracking-wide text-white">{title}</h1>
				<div className="hide-scrollbar" ref={scrollRef} style={{ height: 550 }}>
					{!isLoading && (
						<>
							{hasError ? (
								<span>暂无歌词X...X</span>
							) : (
								<>
									{lyrics.map((lyric: string, index: number) => (
										<div
											key={index}
											className={`text-lg md:text-xl py-2 ${
												index === currLine - 1
													? 'text-yellow-500 opacity-100'
													: 'text-light opacity-80'
											}`}
										>
											{lyric.slice(11)}
										</div>
									))}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	)
}

export default LyricView
