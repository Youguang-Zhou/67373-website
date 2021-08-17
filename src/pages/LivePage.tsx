import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import beautiful_fafa from '../assets/images/beautiful_fafa.png'
// import goodnight67373 from '../assets/images/goodnight67373.jpg'
import fafa_robot from '../assets/images/fafa_robot.png'
import Empty from '../components/Empty'
import useGetLiveInfoRequest from '../hooks/useGetLiveInfoRequest'
import { LiveStatus } from '../utils/enums'

const LivePage: FC = () => {
	const [counter, setCounter] = useState<string[]>([])
	const [heightRef, { height }] = useMeasure<HTMLDivElement>()
	const {
		response: { status, time, url, cover },
	} = useGetLiveInfoRequest()

	useEffect(() => {
		let timer = 0
		if (status === LiveStatus.WillStart && time) {
			timer = window.setInterval(() => {
				const currTime = moment(new Date())
				const liveTime = moment(new Date(time))
				const duration = liveTime.diff(currTime)
				// 计算倒计时
				const formatDuation = moment.duration(duration).format('d:hh:mm:ss', { trim: false }).split(':')
				if (formatDuation[0] === '-0') {
					location.reload()
				} else {
					setCounter([
						`${formatDuation[0]}`,
						'天',
						`${formatDuation[1]}`,
						'时',
						`${formatDuation[2]}`,
						'分',
						`${formatDuation[3]}`,
						'秒',
					])
				}
			}, 1000)
		}
		return () => clearInterval(timer)
	}, [status, time])

	return status === LiveStatus.IsEnded ? (
		<>
			<Empty image={fafa_robot} description="新页面施工中。。。敬请期待！" />
			<div className="my-4 space-y-4 text-center md:text-2xl">
				<p>YouTube：周三打游戏、周六唱歌聊天读邮件（北京时间晚上8:30）</p>
				<p>Twitch：随缘时间看电影</p>
				<p>具体通知关注微博超话@陈一发儿超话</p>
			</div>
		</>
	) : (
		<>
			{url && cover && (
				<div className="relative">
					<img
						className="absolute object-cover w-full filter blur"
						style={{ height: height, zIndex: -1 }}
						src={cover}
						alt="background"
					/>
					<main className="flex-col text-center text-light font-MFYueYuan" ref={heightRef}>
						<h1 className="py-4 text-4xl md:py-8 md:text-6xl lg:text-8xl">
							{status === LiveStatus.WillStart ? '如 期 而 至' : '⬇️ 直 播 中 ⬇️'}
						</h1>
						{status === LiveStatus.WillStart && (
							<div className="py-4 md:py-8">
								<div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8">
									{counter.map((value, index) => (
										<span
											key={index}
											className={
												index % 2 == 0
													? 'text-3xl md:text-6xl lg:text-9xl'
													: 'text-2xl md:text-4xl lg:text-6xl'
											}
										>
											{value}
										</span>
									))}
								</div>
							</div>
						)}
						<div className="flex flex-col items-center justify-center sm:flex-row">
							<img
								className="w-1/2 py-4 sm:w-1/4 md:w-1/5 md:py-8"
								src={beautiful_fafa}
								alt="beautiful_fafa"
							/>
							<div className="py-4 text-lg md:py-8 md:text-2xl lg:text-3xl">
								<div>{`${time} （北京时间）`}</div>
								<div>{url.slice(12)}</div>
							</div>
						</div>
					</main>
				</div>
			)}
		</>
	)
}

export default LivePage
