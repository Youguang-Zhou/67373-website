import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Col, Empty, Row } from 'antd'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import goodnight67373 from '../assets/goodnight67373.jpg'
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
	padding-top: 12vw;
	text-align: center;
`

const useStyles = makeStyles({
	text: { color: '#fafafafa' },
	image: { height: '650px' },
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
		let timer = 0
		getLiveTime()
			.then(({ time, url, cover }) => {
				setLiveTime(time)
				setYoutubeURL(url)
				setLiveCover(cover)
				timer = window.setInterval(() => {
					const currTime = moment(new Date())
					const liveTime = moment(new Date(time))
					// 检查是否开始直播
					currTime.isBefore(liveTime) ? setIsLive(false) : setIsLive(true)
					// 计算倒计时
					const diff = liveTime.diff(currTime)
					const duration = moment.duration(diff).format('d:hh:mm:ss').split(':')
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
			{youtubeURL && liveCover ? (
				<>
					<BackGround className={classes.image} src={liveCover} alt="background" />
					<CounterBox className={classes.image}>
						<Row align="middle" justify="center">
							{counter.map((value, index) => (
								<Typography
									key={index}
									variant="h1"
									className={classes.text}
									style={{ fontSize: index % 2 == 0 ? '10vw' : '3vw' }}
									gutterBottom
								>
									{value}
								</Typography>
							))}
						</Row>
						<Typography variant="h5" className={classes.text} gutterBottom>
							{liveTime}
						</Typography>
						<Typography variant="h5" className={classes.text} gutterBottom>
							{youtubeURL}
						</Typography>
					</CounterBox>
				</>
			) : (
				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={16} xl={16}>
						{isLive && playOptions ? (
							<VideoPlayer options={playOptions} onLoad={handlePlayerLoad} />
						) : (
							<Empty
								image={goodnight67373}
								imageStyle={{ height: '15rem' }}
								description={<span style={{ fontSize: 'xx-large' }}>See you next time~</span>}
							/>
						)}
					</Col>
				</Row>
			)}
		</main>
	)
}

export default LivePage
