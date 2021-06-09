import CircularProgress from '@material-ui/core/CircularProgress'
import { Avatar, BackTop } from 'antd'
import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react'
import cat from '../assets/images/cat.jpeg'
import Empty from './Empty'

interface IInfiniteScroll {
	children?: ReactNode
	isLoading: boolean
	hasMore: boolean
	hasError: boolean
	emptyComponent?: ReactNode
	loadMore: () => void
}

const InfiniteScroll: FC<IInfiniteScroll> = ({
	children,
	isLoading,
	hasMore,
	hasError,
	emptyComponent,
	loadMore,
}: IInfiniteScroll) => {
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
						<div className="text-center p-5" ref={observerRef}>
							<CircularProgress />
						</div>
					) : (
						<>{emptyComponent}</>
					)}
				</>
			)}
			<BackTop className="h-auto w-auto">
				<Avatar src={cat} size={80} />
			</BackTop>
		</>
	)
}

export default InfiniteScroll
