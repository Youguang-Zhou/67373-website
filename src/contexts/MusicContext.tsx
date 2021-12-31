import React, {
	createContext,
	Dispatch,
	ProviderProps,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useQuery } from 'react-query'
import { getVodList } from '../utils/api'
import { MediaType, PlayOrder } from '../utils/enums'

interface MusicProviderProps {
	player: HTMLAudioElement | undefined
	playlist: VodProps[]
	isEnded: boolean
	isPlaying: boolean
	currSong: VodProps | undefined
	currTime: number
	currOrder: PlayOrder
	setCurrSong: Dispatch<SetStateAction<VodProps | undefined>>
	setCurrOrder: Dispatch<SetStateAction<PlayOrder>>
	switchSong: (offset: number, triggerByUser: boolean) => void
	initializePlayer: (audio: VodProps) => void
	cleanUpPlayer: () => void
}

const MusicContext = createContext({} as MusicProviderProps)
const { Provider } = MusicContext
const { Repeat, RepeatOne, Shuffle } = PlayOrder

const MusicProvider = ({ children }: ProviderProps<MusicProviderProps | undefined>) => {
	const currIndexRef = useRef<number | undefined>()
	const currOrderRef = useRef<PlayOrder>(Repeat)
	const [player, setPlayer] = useState<HTMLAudioElement | undefined>()
	const [isEnded, setIsEnded] = useState<boolean>(false)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currSong, setCurrSong] = useState<VodProps | undefined>()
	const [currTime, setCurrTime] = useState<number>(0)
	const [currOrder, setCurrOrder] = useState<PlayOrder>(Repeat)
	const { data: { videoList: { video: playlist = [] } = {} } = {} } = useQuery(
		MediaType.Audio,
		() => getVodList(MediaType.Audio, 1, 100)
	)

	useEffect(() => {
		currOrderRef.current = currOrder
	}, [currOrder])

	useEffect(() => {
		if (!player) return
		// 定义EventListener
		const handlePlay = () => setIsPlaying(true)
		const handlePause = () => setIsPlaying(false)
		const handlePlaying = () => setIsEnded(false)
		const handleEnded = () => switchSong(1, false)
		const handleTimeupdate = () => setCurrTime(player.currentTime)
		// 添加EventListener
		player.addEventListener('play', handlePlay)
		player.addEventListener('pause', handlePause)
		player.addEventListener('playing', handlePlaying)
		player.addEventListener('ended', handleEnded)
		player.addEventListener('timeupdate', handleTimeupdate)
		// 尝试自动播放
		player.play().catch((error) => console.log(error))
		return () => {
			// 清理当前播放器
			player.pause()
			// 清理EventListener
			player.removeEventListener('play', handlePlay)
			player.removeEventListener('pause', handlePause)
			player.removeEventListener('playing', handlePlaying)
			player.removeEventListener('ended', handleEnded)
			player.removeEventListener('timeupdate', handleTimeupdate)
		}
	}, [player])

	// 初始化播放器
	const initializePlayer = (audio: VodProps) => {
		cleanUpPlayer()
		setPlayer(new Audio(audio.description))
		playlist.map(
			({ videoId }, index) => videoId === audio.videoId && (currIndexRef.current = index)
		)
	}

	// 清理播放器
	const cleanUpPlayer = () => {
		setPlayer(undefined)
		setCurrSong(undefined)
		setCurrTime(0)
	}

	// 切歌（+1表示切到下一首，-1表示切到上一首）
	const switchSong = (offset: number, triggerByUser: boolean) => {
		setIsEnded(true)
		if (!player || currIndexRef.current === undefined) return
		let songToPlay = undefined
		const { current } = currOrderRef
		// ===循环播放 或者 单曲循环但是由用户点击按钮触发===
		if (current === Repeat || (current === RepeatOne && triggerByUser)) {
			const newIndex = currIndexRef.current + offset
			if (newIndex < 0) {
				// 到第一首歌了，切到最后一首歌
				songToPlay = playlist[playlist.length - 1]
			} else if (newIndex > playlist.length - 1) {
				// 到最后一首歌了，切到第一首歌
				songToPlay = playlist[0]
			} else {
				songToPlay = playlist[newIndex]
			}
		}
		// ===单曲循环下自动重新播放===
		else if (current === RepeatOne && !triggerByUser) {
			player.play()
		}
		// ===随机播放===
		else if (current === Shuffle) {
			// 除了当前歌曲的剩下的歌曲
			const arr = playlist.filter((audio) => audio !== currSong)
			// 其中随机选一首
			songToPlay = arr[Math.floor(Math.random() * arr.length)]
		}
		songToPlay && setCurrSong(songToPlay)
	}

	return (
		<Provider
			value={{
				player,
				playlist,
				isEnded,
				isPlaying,
				currSong,
				currTime,
				currOrder,
				setCurrSong,
				setCurrOrder,
				switchSong,
				initializePlayer,
				cleanUpPlayer,
			}}
		>
			{children}
		</Provider>
	)
}

export { MusicContext, MusicProvider }
