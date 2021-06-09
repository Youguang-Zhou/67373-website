import React, { FC } from 'react'
import styled from 'styled-components'
import { formatDuration } from '../utils/functions'
import { IVod } from '../utils/interfaces'

const Card = styled.div`
	background-color: #181818;
	transition: background-color 0.3s, border 0.3s;

	&:hover {
		background-color: #242424;
		border: 1px solid rgb(255 255 255 / 10%);
	}
`

interface IAudioCard {
	audio: IVod
	highlight: boolean
	onDoubleClick: () => void
}

const AudioCard: FC<IAudioCard> = ({ audio: { title, duration, coverURL }, highlight, onDoubleClick }: IAudioCard) => (
	<div className="col">
		<Card className="card h-100" onDoubleClick={onDoubleClick}>
			<div className="p-3">
				<img className="card-img-top rounded-3" src={coverURL} alt={title} />
			</div>
			<div className="card-body">
				<h5 className="card-title" style={{ color: highlight ? 'orange' : '#f8f9fa' }}>
					{title}
				</h5>
				<span className="card-text" style={{ opacity: 0.8 }}>
					{formatDuration(duration)}
				</span>
			</div>
		</Card>
	</div>
)

export default AudioCard
