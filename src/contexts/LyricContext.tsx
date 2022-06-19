import {
	createContext,
	Dispatch,
	ProviderProps,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useQuery } from 'react-query'
import { getLyrics } from '../utils/api'
import { duration2Seconds } from '../utils/functions'
import { MusicContext } from './MusicContext'

interface LyricProviderProps {
	lyrics: string[] | undefined
	currLine: number
	setCurrLine: Dispatch<SetStateAction<number>>
}

const LyricContext = createContext({} as LyricProviderProps)
const { Provider } = LyricContext

const LyricProvider = ({ children }: ProviderProps<LyricProviderProps | undefined>) => {
	const [currLine, setCurrLine] = useState<number>(0)
	const { isEnded, currTime, currSong: { videoId: id = '' } = {} } = useContext(MusicContext)
	const { data: { lyrics } = {} } = useQuery(['lyrics', id], () => getLyrics(id), {
		enabled: !!id,
	})

	// 根据当前时间（currTime）计算当前歌词行数
	// currTime的单位：秒，
	// 每一行歌词的格式为：[mm:ss.xx] 听说白雪公主在逃跑
	useEffect(() => {
		if (!lyrics || currLine >= lyrics.length) return
		// 转为hh:mm:ss格式，方便计算
		const time = duration2Seconds(`00:${lyrics[currLine].slice(1, 6)}`)
		currTime >= time && setCurrLine(currLine + 1)
	}, [currTime])

	// 切歌时重置歌词行数
	useEffect(() => setCurrLine(0), [isEnded])

	return <Provider value={{ lyrics, currLine, setCurrLine }}>{children}</Provider>
}

export { LyricContext, LyricProvider }
