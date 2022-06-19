import { useEventListener } from '@react-hookz/web'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import love_you from '../assets/love_you.png'
import { BACK_TO_TOP_HEIGHT } from '../utils/constants'
import BackToTop from './BackToTop'
import Empty from './Empty'
import Loading from './Loading'

interface InfiniteScrollProps {
	children?: ReactNode
	hasMore: boolean | undefined
	hasError: boolean
	isLoading: boolean
	loadMore: () => void
}

// 通过IntersectionObserver实现无限滚动，
// 详见：https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
const InfiniteScroll = ({
	children,
	hasMore,
	hasError,
	isLoading,
	loadMore,
}: InfiniteScrollProps) => {
	const [showBackToTop, setShowBackToTop] = useState(false)
	const observerRef = useRef<HTMLDivElement>(null)
	const scroll = useCallback(
		(entries: IntersectionObserverEntry[]) =>
			entries[0].isIntersecting && hasMore && !isLoading && loadMore(),
		[isLoading, hasMore]
	)

	useEventListener(window, 'scroll', () => setShowBackToTop(scrollY > BACK_TO_TOP_HEIGHT))

	useEffect(() => {
		const observer = new IntersectionObserver(scroll)
		observerRef.current && observer.observe(observerRef.current)
		return () => observer.disconnect()
	}, [observerRef, scroll])

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{hasError ? (
						<Empty error />
					) : (
						<>
							{children}
							{hasMore ? (
								// 把观察点绑定到<Loading />组件上
								<div ref={observerRef}>
									<Loading />
								</div>
							) : (
								<Empty image={love_you} />
							)}
						</>
					)}
					{showBackToTop && <BackToTop />}
				</>
			)}
		</>
	)
}

export default InfiniteScroll
