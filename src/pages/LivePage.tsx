import { Col, Row } from 'antd'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import beautiful_fafa from '../assets/images/beautiful_fafa.png'
import goodnight67373 from '../assets/images/goodnight67373.jpg'
import Empty from '../components/Empty'
import useGetLiveInfoRequest from '../hooks/useGetLiveInfoRequest'
import { LiveStatus } from '../utils/enums'

const BackGround = styled.img<{ height: number }>`
	filter: blur(5px);
	height: ${({ height }) => height}px;
	object-fit: cover;
	position: absolute;
	width: 100%;
	z-index: -1;
`

const Text = styled.div<{ fontSize?: string }>`
	color: #fafafafa;
	font-family: MFYueYuan;
	font-size: ${({ fontSize }) => fontSize || '1.5rem'};
	margin: 1rem 1vw;
	text-shadow: black 0.1em 0.1em 0.2em;
`

const LivePage: FC = () => {
	const [counter, setCounter] = useState<string[]>([])
	const [ref, { height }] = useMeasure<HTMLDivElement>()
	const {
		response: { status, duration, time, url, cover },
	} = useGetLiveInfoRequest()

	useEffect(() => {
		if (status === LiveStatus.WillStart) {
			// 计算倒计时
			const formatDuation = moment.duration(duration).format('d:hh:mm:ss', { trim: false }).split(':')
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
	}, [status, duration])

	return (
		<>
			{status === LiveStatus.IsEnded ? (
				<Empty image={goodnight67373} description="See you next time~" />
			) : (
				<>
					{url && cover && (
						<>
							<BackGround src={cover} alt="background" height={height} />
							<main ref={ref} className="text-center">
								<Row className="py-5" align="middle" justify="center">
									<Col span={24}>
										<Text fontSize="calc(3vw + 2rem)">
											{status === LiveStatus.WillStart ? '如 期 而 至' : '⬇️ 直 播 中 ⬇️'}
										</Text>
									</Col>
									{status === LiveStatus.WillStart && (
										<Col span={24}>
											<Row align="middle" justify="center">
												{counter.map((value, index) => (
													<Text
														key={index}
														fontSize={index % 2 == 0 ? 'calc(5vw + 2rem)' : '3vw'}
													>
														{value}
													</Text>
												))}
											</Row>
										</Col>
									)}
									<Col xs={24} lg={4}>
										<img
											src={beautiful_fafa}
											alt="beautiful_fafa"
											style={{ height: 'calc(5vw + 15rem)' }}
										/>
									</Col>
									<Col xs={24} lg={6}>
										<Text>{`${time} （北京时间）`}</Text>
										<Text>{url.slice(12)}</Text>
									</Col>
								</Row>
							</main>
						</>
					)}
				</>
			)}
		</>
	)
}

export default LivePage
