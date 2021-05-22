import { makeStyles } from '@material-ui/core/styles'
import { Col, Empty, Row } from 'antd'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import beautiful_fafa from '../assets/images/beautiful_fafa.png'
import goodnight67373 from '../assets/images/goodnight67373.jpg'
import VideoPlayer from '../components/VideoPlayer'
import { getLiveTime, getLiveURL } from '../utils/api'

const BackGround = styled.img`
	filter: blur(10px);
	object-fit: cover;
	position: absolute;
	width: 100%;
	z-index: -1;
`

const CounterBox = styled.div`
	padding-top: 3vw;
	text-align: center;
`

const useStyles = makeStyles({
	text: {
		color: '#fafafafa',
		fontFamily: 'MFYueYuan',
		margin: '1rem 1vw',
		textShadow: 'black 0.1em 0.1em 0.2em',
	},
	image: { height: '740px' },
})

const LivePage: FC = () => {
	const classes = useStyles()
	const [isLive, setIsLive] = useState(false)
	const [liveTime, setLiveTime] = useState('')
	const [youtubeURL, setYoutubeURL] = useState('')
	const [liveCover, setLiveCover] = useState('')
	const [counter, setCounter] = useState<string[]>([])
	const [playOptions, setPlayOptions] = useState<VideoJsPlayerOptions>()

	useEffect(() => {
		// 获取转播地址
		getLiveURL().then(({ liveURL }) =>
			setPlayOptions({
				sources: [
					{
						src: liveURL,
						type: 'application/x-mpegURL',
					},
				],
			})
		)
		// 获取直播时间，封面和地址
		let timer = 0
		getLiveTime()
			.then(({ time, url, cover }) => {
				setLiveTime(time)
				setYoutubeURL(url.slice(12))
				setLiveCover(cover)
				timer = window.setInterval(() => {
					const currTime = moment(new Date())
					const liveTime = moment(new Date(time))
					// 检查是否开始直播
					currTime.isBefore(liveTime) ? setIsLive(false) : setIsLive(true)
					// 计算倒计时
					const diff = liveTime.diff(currTime)
					const duration = moment.duration(diff).format('d:hh:mm:ss', { trim: false }).split(':')
					setCounter([
						`${duration[0]}`,
						'天',
						`${duration[1]}`,
						'时',
						`${duration[2]}`,
						'分',
						`${duration[3]}`,
						'秒',
					])
				}, 1000)
			})
			.catch(() => setIsLive(false))
		return () => clearInterval(timer)
	}, [])

	const handlePlayerLoad = (player: VideoJsPlayer) => player.on('error', () => setIsLive(false))

	return (
		<main className="mt-3">
			{isLive && playOptions ? (
				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={16} xl={16}>
						<VideoPlayer options={playOptions} onLoad={handlePlayerLoad} />
						<div>转播功能内测中，如有卡顿或掉线，微博联系@青山多妩媚67373</div>
						<div>{`直播原地址: ${youtubeURL}`}</div>
					</Col>
				</Row>
			) : (
				<>
					{youtubeURL && liveCover ? (
						<>
							<BackGround className={classes.image} src={liveCover} alt="background" />
							<CounterBox className={classes.image}>
								<h2 className={classes.text} style={{ fontSize: 'calc(3vw + 2rem)' }}>
									好久不见
								</h2>
								<Row align="middle" justify="center">
									{counter.map((value, index) => (
										<h1
											key={index}
											className={classes.text}
											style={{ fontSize: index % 2 == 0 ? 'calc(5vw + 2rem)' : '3vw' }}
										>
											{value}
										</h1>
									))}
								</Row>
								<Row align="middle" justify="center">
									<Col xs={24} sm={24} md={24} lg={3} xl={3}>
										<img src={beautiful_fafa} alt="beautiful_fafa" style={{ height: '10rem' }} />
									</Col>
									<Col xs={24} sm={24} md={24} lg={6} xl={6}>
										<h4 className={classes.text}>{liveTime}</h4>
										<h4 className={classes.text}>{youtubeURL}</h4>
									</Col>
								</Row>
							</CounterBox>
						</>
					) : (
						<Row justify="center">
							<Empty
								image={goodnight67373}
								imageStyle={{ height: '15rem' }}
								description={<span style={{ fontSize: 'xx-large' }}>See you next time~</span>}
							/>
						</Row>
					)}
				</>
			)}
		</main>
	)
}

export default LivePage
