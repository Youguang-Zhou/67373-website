import { Col, Row } from 'antd'
import React, { FC, useContext, useEffect, useRef } from 'react'
import { usePrevious } from 'react-use'
import styled from 'styled-components'
import { LyricContext } from '../contexts/LyricContext'
import { MusicContext } from '../contexts/MusicContext'

const Box = styled(Row)`
	margin-bottom: 8rem;
	padding: 2vw 0px;
	text-align: center;
`

const LyricList = styled.div`
	height: 550px;
	overflow: scroll;
	pointer-events: none;

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}

	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`

const Lyric = styled.div<{ highlight: boolean }>`
	color: ${({ highlight }) => (highlight ? 'orange' : '#fafafacc')};
	font-size: 20px;
	padding: 10px 0px;
`

interface ILyricView {
	isLoading: boolean
	hasError: boolean
}

const LyricView: FC<ILyricView> = ({ isLoading, hasError }: ILyricView) => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const { getCurrSongInfo } = useContext(MusicContext)
	const { lyrics, currLine, shouldShowLyricView } = useContext(LyricContext)
	const { coverURL, title } = getCurrSongInfo()
	const prevViewIsLyricView = usePrevious(shouldShowLyricView)
	const notScrollLine = 6 // 前几行先不滚动

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scroll({
				top: currLine > notScrollLine ? 50 * (currLine - notScrollLine) : 0,
				left: 0,
				behavior: prevViewIsLyricView ? 'smooth' : 'auto',
			})
		}
	}, [currLine])

	return (
		<Box align="middle" justify="center">
			<Col xs={12} md={12} lg={8}>
				<img className="rounded-circle w-75 mb-3" src={coverURL} alt={title} />
			</Col>
			<Col xs={24} md={12} lg={12}>
				<h1 className="text-light mb-4">{title}</h1>
				<LyricList ref={scrollRef}>
					{!isLoading && (
						<>
							{hasError ? (
								<span>暂无歌词X...X</span>
							) : (
								<>
									{lyrics.map((lyric: string, index: number) => (
										<Lyric key={index} highlight={index === currLine - 1}>
											{lyric.slice(11)}
										</Lyric>
									))}
								</>
							)}
						</>
					)}
				</LyricList>
			</Col>
		</Box>
	)
}

export default LyricView
