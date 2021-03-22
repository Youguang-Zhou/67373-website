import { List, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const ENDPOINT = 'https://danmu.67373upup.com:7373'
const MAX_CHAT_MESSAGES = 100

const { Item } = List
const { Text } = Typography

interface ILiveChatsList {
	height: number
}

const LiveChatsList: FC<ILiveChatsList> = ({ height }: ILiveChatsList) => {
	const [liveChats, setLiveChats] = useState<string[]>([])

	useEffect(() => {
		const socket = io(ENDPOINT, { secure: true })
		socket.on('LiveChat', (msg) =>
			setLiveChats((preChats) => {
				// 使弹幕数量始终保持在 MAX_CHAT_MESSAGES 个
				preChats.length === MAX_CHAT_MESSAGES && preChats.shift()
				return [...preChats, msg]
			})
		)
		return () => {
			socket.close()
			console.log('Socket closed.')
		}
	}, [])

	return (
		<List
			size="small"
			dataSource={liveChats}
			style={{ height: height }}
			renderItem={(item) => (
				<Item>
					<Text>{item}</Text>
				</Item>
			)}
		/>
	)
}

export default LiveChatsList
