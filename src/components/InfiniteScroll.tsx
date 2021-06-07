import { Avatar, BackTop, Spin } from 'antd'
import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react'
import cat from '../assets/images/cat.jpeg'
import Error from './Error'

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
				<Error />
			) : (
				<>
					{children}
					{hasMore ? (
						<div className="text-center p-5" ref={observerRef}>
							<Spin size="large" />
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
