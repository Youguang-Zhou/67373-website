import React, { FC } from 'react'
import styled from 'styled-components'
import { formatDuration } from '../utils/functions'
import { IVod } from '../utils/interfaces'

const Card = styled.div<{ variant?: string }>`
	background-color: ${({ variant }) => (variant === 'light' ? 'transparent' : '#181818')};
	transition: background-color 0.3s, border 0.3s;

	&:hover {
		background-color: ${({ variant }) => (variant === 'light' ? 'transparent' : '#242424')};
		border: 1px solid rgb(255 255 255 / 10%);
		box-shadow: ${({ variant }) => variant === 'light' && 'gray 0 0 5px'};
	}
`

interface IAudioCard {
	audio: IVod
	variant?: 'light' | 'dark'
	highlight?: boolean
	onClick?: () => void
	onDoubleClick?: () => void
}

const AudioCard: FC<IAudioCard> = ({ audio, variant, highlight, onClick, onDoubleClick }: IAudioCard) => {
	const textColor = variant === 'light' ? '#212529' : '#fafafa'
	const highlightColor = 'orange'

	return (
		<>
			{/* 桌面端尺寸 */}
			<div className="d-none d-sm-flex">
				<div className="col">
					<Card
						className="card h-100"
						variant={variant}
						onClick={onClick}
						onDoubleClick={onDoubleClick}
						style={{ cursor: 'pointer' }}
					>
						<div className="p-3">
							<img className="card-img-top rounded-3" src={audio.coverURL} alt={audio.title} />
						</div>
						<div className="card-body pt-0">
							<h5 className="card-title" style={{ color: highlight ? highlightColor : textColor }}>
								{audio.title}
							</h5>
							<span className="card-text" style={{ opacity: 0.8, color: textColor }}>
								{formatDuration(audio.duration)}
							</span>
						</div>
					</Card>
				</div>
			</div>
			{/* 移动端尺寸 */}
			<div className="d-block d-sm-none">
				<div
					className={`row align-items-center justify-content-center mx-1
					${variant === 'light' && 'border rounded'}`}
					style={{ cursor: 'pointer' }}
					onClick={onClick}
					onDoubleClick={onDoubleClick}
				>
					<div className="col-3 text-center p-0">
						<img
							className={`w-100 ${variant === 'light' ? 'rounded-start' : 'rounded'}`}
							src={audio.coverURL}
							alt={audio.title}
						/>
					</div>
					<div className="col-9">
						<div className="row">
							<span className="fs-5" style={{ color: highlight ? highlightColor : textColor }}>
								{audio.title}
							</span>
						</div>
						<div className="row">
							<span>陈一发儿</span>
						</div>
					</div>
				</div>
				<hr />
			</div>
		</>
	)
}

export default AudioCard
