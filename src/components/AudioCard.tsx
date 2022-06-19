import { useRef } from 'react'
import { formatDuration } from '../utils/functions'

interface AudioCardProps {
	audio: VodProps
	type?: 'primary' | 'secondary'
	highlight?: boolean
	isNewSong?: boolean
	onSingleClick?: () => void
	onDoubleClick?: () => void
}

const AudioCard = ({
	audio: { title, duration, coverURL },
	type = 'primary',
	highlight = false,
	isNewSong = false,
	onSingleClick,
	onDoubleClick,
}: AudioCardProps) => {
	// 判断双击还是单击的计时器
	const timerRef = useRef<number | undefined>()

	// 双击在当前标签页打开，单击在新标签页打开
	const handleClick = () => {
		if (timerRef.current !== undefined) {
			// 双击
			onDoubleClick && onDoubleClick()
			clearTimeout(timerRef.current)
			timerRef.current = undefined
		} else {
			// 单击
			timerRef.current = window.setTimeout(() => {
				onSingleClick && onSingleClick()
				clearTimeout(timerRef.current)
				timerRef.current = undefined
			}, 250)
		}
	}

	return (
		<div className={`cursor-pointer ${type === 'primary' ? '' : 'hover:shadow'}`}>
			{/* 桌面端尺寸 */}
			<div
				className={`flex-col h-full hidden p-4 space-y-4 transition-all border rounded sm:flex ${
					type === 'primary'
						? 'bg-spotify-600 hover:bg-spotify-300 border-spotify-900 hover:border-white hover:border-opacity-10'
						: ''
				}`}
				onClick={handleClick}
			>
				<img className="rounded" src={coverURL} alt={title} />
				<div className="flex space-x-1">
					<h3 className={`text-xl ${highlight ? 'text-orange-400' : ''}`}>{title}</h3>
					{isNewSong && <span className="new-song-label">New</span>}
				</div>
				<small className="text-lg opacity-80">{formatDuration(duration)}</small>
			</div>
			{/* 移动端尺寸 */}
			<div className="flex items-stretch space-x-4 text-md sm:hidden" onClick={handleClick}>
				<div className="flex-shrink-0 w-1/4 p-1">
					<img className="rounded" src={coverURL} alt={title} />
				</div>
				<div
					className={`flex items-center flex-1 p-1 border-b ${
						type === 'primary' ? 'border-opacity-30' : ''
					}`}
				>
					<div className="flex-1">
						<div className="flex space-x-1">
							<h3 className={`text-2xl ${highlight ? 'text-orange-400' : ''}`}>
								{title}
							</h3>
							{isNewSong && <span className="new-song-label">新</span>}
						</div>
						<h5 className="opacity-80">陈一发儿</h5>
					</div>
					<small className="opacity-80">{formatDuration(duration)}</small>
				</div>
			</div>
		</div>
	)
}

export default AudioCard
