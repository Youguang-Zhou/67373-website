import { Col, Row } from 'antd'
import React, { FC, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import fafa_robot from '../../assets/images/fafa_robot.png'
import { MusicContext } from '../../contexts/MusicContext'
import { getAudioList } from '../../utils/api'
import { formatDuration } from '../../utils/functions'
import { IVideo } from '../../utils/interfaces'
import Empty from '../Empty'
import Cover from './Cover'

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
	const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
		getAudioList()
			.then(({ requestId, videoList: { video } }) => (requestId ? setPlaylist(video) : setHasMore(false)))
			.catch(() => setHasMore(false))
	}, [])

	const handleDoubleClick = (index: number) => setCurrIndex(index)

	const highlightCurrSong = (vid: string) => (getCurrSongInfo().videoId === vid ? 'orange' : 'inherit')

	return (
		<>
			{hasMore ? (
				<>
					{playlist.map((audio: IVideo, index: number) => (
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
			) : (
				<Empty
					image={fafa_robot}
					style={{ color: '#fafafafa' }}
					description="服务器蚌埠住了，微博联系@青山多妩媚67373"
				/>
			)}
		</>
	)
}

export default AudioList
