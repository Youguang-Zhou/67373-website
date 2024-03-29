import {
	DescriptionOutlined,
	KeyboardArrowDownRounded,
	KeyboardArrowRightRounded,
	MailOutline,
} from '@mui/icons-material'
import { MutableRefObject, ReactNode, useState } from 'react'
import { VideoJsPlayer } from 'video.js'
import { duration2Seconds } from '../utils/functions'

interface SubTitleProps {
	icon: ReactNode
	subtitle: string
}

interface VideoDescriptionProps {
	description: string
	playerRef: MutableRefObject<VideoJsPlayer | undefined>
}

const SubTitle = ({ icon, subtitle }: SubTitleProps) => (
	<div className="flex items-center space-x-1">
		{icon}
		<h3 className="text-2xl">{subtitle}</h3>
	</div>
)

const VideoDescription = ({ description, playerRef }: VideoDescriptionProps) => {
	const [isToggleDesc, setIsToggleDesc] = useState(false)

	return (
		<div className="p-4 mb-4 border rounded shadow xl:mb-8">
			<SubTitle icon={<DescriptionOutlined fontSize="large" />} subtitle="简介" />
			{description.split('\n').map((desc, index) => {
				// 时间轴
				if (desc.startsWith('[')) {
					// 快速跳跃到固定时间点
					// 例如['hh:mm:ss童话镇', ... , 'hh:mm:ss阿婆说']
					const arr = desc.slice(1, desc.length - 1).split(',')
					return (
						<div key={index} className="relative mt-8">
							<button onClick={() => setIsToggleDesc(!isToggleDesc)}>
								<SubTitle
									icon={
										isToggleDesc ? (
											<KeyboardArrowRightRounded />
										) : (
											<KeyboardArrowDownRounded />
										)
									}
									subtitle="时间轴"
								/>
							</button>
							{!isToggleDesc && (
								<div className="my-2">
									{arr.map((str, index) => (
										<p key={index}>
											<button
												className="p-2 text-primary tabular-nums hover:opacity-70"
												onClick={() =>
													playerRef.current &&
													playerRef.current.currentTime(
														duration2Seconds(str.slice(0, 8))
													)
												}
											>
												{str.slice(0, 8)}
											</button>
											{str.slice(8) === '邮件环节' ? (
												<span className="inline-flex items-center">
													{str.slice(8)}
													<MailOutline />
												</span>
											) : (
												<span>{str.slice(8)}</span>
											)}
										</p>
									))}
								</div>
							)}
						</div>
					)
				} else {
					// 正常的简介
					return (
						<p key={index} className="my-2">
							{desc}
						</p>
					)
				}
			})}
		</div>
	)
}

export default VideoDescription
