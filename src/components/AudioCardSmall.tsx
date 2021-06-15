import React, { FC } from 'react'
import { IVod } from '../utils/interfaces'

interface IAudioCardSmall {
	audio: IVod
	highlight: boolean
	onDoubleClick: () => void
}

const AudioCardSmall: FC<IAudioCardSmall> = ({
	audio: { title, coverURL },
	highlight,
	onDoubleClick,
}: IAudioCardSmall) => (
	<div className="row align-items-center justify-content-center p-3" onDoubleClick={onDoubleClick}>
		<div className="col-4 text-center">
			<img className="w-100 rounded" src={coverURL} alt={title} />
		</div>
		<div className="col-8">
			<div className="row">
				<span className="fs-5" style={{ color: highlight ? 'orange' : '#f8f9fa' }}>
					{title}
				</span>
			</div>
			<div className="row">
				<span>陈一发儿</span>
			</div>
		</div>
	</div>
)

export default AudioCardSmall
