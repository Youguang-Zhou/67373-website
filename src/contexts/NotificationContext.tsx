import React, { createContext, ProviderProps, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getVodList } from '../utils/api'
import { MediaType } from '../utils/enums'
import { date2Today } from '../utils/functions'

const NotificationContext = createContext<any>(undefined)

const { Audio } = MediaType
const { Provider } = NotificationContext

// 通知中心，目前仅支持通知“音乐”页面有新歌上传
const NotificationProvider = ({ children }: ProviderProps<any>) => {
	const EXPIRED_DATE = 3
	const [hasNewSong, setHasNewSong] = useState(false)
	const { data } = useQuery('spotify', () => getVodList(Audio, 1, 100))

	// 如果有歌曲的创建日期小于等于过期日期（EXPIRED_DATE），则表明有新歌
	useEffect(() => {
		data?.videoList?.video.map(
			({ creationTime }) =>
				date2Today(creationTime) <= EXPIRED_DATE && setHasNewSong(true)
		)
	}, [data])

	return <Provider value={{ hasNewSong }}>{children}</Provider>
}

export { NotificationContext, NotificationProvider }
