import CircularProgress from '@material-ui/core/CircularProgress'
import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react'
import xiaode from '../assets/images/xiaode.png'
import Empty from './Empty'

interface InfiniteScrollProps {
	children?: ReactNode
	isLoading: boolean
	hasMore: boolean
	hasError: boolean
	emptyComponent?: ReactNode
	loadMore: () => void
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({
	children,
	isLoading,
	hasMore,
	hasError,
	emptyComponent,
	loadMore,
}: InfiniteScrollProps) => {
	const observerRef = useRef<HTMLDivElement>(null)
	const scroll = useCallback(
		(entries) => entries[0].isIntersecting && hasMore && !isLoading && loadMore(),
		[isLoading, hasMore]
	)

	useEffect(() => {
		const observer = new IntersectionObserver(scroll)
		observerRef.current && observer.observe(observerRef.current)
		return () => observer.disconnect()
	}, [observerRef, scroll])

	return (
		<>
			{hasError ? (
				<Empty error />
			) : (
				<>
					{children}
					{hasMore ? (
						<div className="my-8 text-center text-primary" ref={observerRef}>
							<CircularProgress color="inherit" />
						</div>
					) : (
						<>{emptyComponent}</>
					)}
				</>
			)}
			<button
				className="fixed p-1 bg-white rounded-full shadow bottom-10 right-10 md:bottom-20 md:right-20"
				onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
			>
				<img className="w-16 h-16 md:w-20 md:h-20" src={xiaode} alt="backToTop" />
			</button>
		</>
	)
}

export default InfiniteScroll
