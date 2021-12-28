import React, { createContext, ProviderProps, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getVodList } from '../utils/api'
import { MediaType } from '../utils/enums'
import { isRecentPublished } from '../utils/functions'

interface NotificationProviderProps {
	hasNewSong: boolean
}

const NotificationContext = createContext({} as NotificationProviderProps)
const { Provider } = NotificationContext
const { Audio } = MediaType

// 通知中心，目前仅支持通知“音乐”页面有新歌上传
const NotificationProvider = ({
	children,
}: ProviderProps<NotificationProviderProps | undefined>) => {
	const [hasNewSong, setHasNewSong] = useState(false)
	const { data: { videoList } = {} } = useQuery(Audio, () => getVodList(Audio, 1, 100))

	// 如果有歌曲的创建日期距离当前日期在一定时间段内，则表明有新歌
	useEffect(() => {
		videoList?.video.map(
			({ creationTime }) => isRecentPublished(creationTime) && setHasNewSong(true)
		)
	}, [videoList])

	return <Provider value={{ hasNewSong }}>{children}</Provider>
}

export { NotificationContext, NotificationProvider }
