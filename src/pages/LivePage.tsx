import { Col, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import { getLiveURL } from '../utils/api'
import { IPlayOptions } from '../utils/interfaces'

const LivePage: FC = () => {
	const [playOptions, setPlayOptions] = useState<IPlayOptions>()

	useEffect(() => {
		getLiveURL().then((url) => {
			const options = {
				sources: [
					{
						src: url,
						type: 'application/x-mpegURL',
					},
				],
			}
			setPlayOptions(options)
		})
	}, [])

	return (
		<main className="mt-3">
			<Row justify="center">
				<Col xs={24} sm={24} md={24} lg={16} xl={16}>
					{playOptions && <VideoPlayer options={playOptions} />}
				</Col>
			</Row>
		</main>
	)
}

export default LivePage
