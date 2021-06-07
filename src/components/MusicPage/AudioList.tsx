import { Col, Row } from 'antd'
import React, { FC, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MusicContext } from '../../contexts/MusicContext'
import useGetPlayListRequest from '../../hooks/useGetPlayListRequest'
import { formatDuration } from '../../utils/functions'
import { IVod } from '../../utils/interfaces'
import Cover from './Cover'

const { REACT_APP_VOD_CATE_ID_AUDIO } = process.env

const Song = styled(Row)`
	color: #fafafafa;
	cursor: pointer;
	font-size: 1.5rem;
	padding: 8px;
	text-align: center;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`

const AudioList: FC = () => {
	const { playlist, setPlaylist, setCurrIndex, getCurrSongInfo } = useContext(MusicContext)
	const { data } = useGetPlayListRequest(REACT_APP_VOD_CATE_ID_AUDIO, 1, 100)

	useEffect(() => {
		data.videoList && setPlaylist(data.videoList.video)
	}, [data])

	const handleDoubleClick = (index: number) => setCurrIndex(index)

	const highlightCurrSong = (vid: string) => (getCurrSongInfo().videoId === vid ? 'orange' : 'inherit')

	return (
		<>
			{playlist.map((audio: IVod, index: number) => (
				<Song align="middle" key={audio.videoId} onDoubleClick={() => handleDoubleClick(index)}>
					<Col span={8}>
						<Cover src={audio.coverURL} alt={audio.title} size="3rem" />
					</Col>
					<Col span={8}>
						<span style={{ color: highlightCurrSong(audio.videoId) }}>{audio.title}</span>
					</Col>
					<Col span={8}>{formatDuration(audio.duration)}</Col>
				</Song>
			))}
		</>
	)
}

export default AudioList
