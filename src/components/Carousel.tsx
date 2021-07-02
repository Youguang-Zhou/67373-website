import React, { Children, FC, HTMLProps } from 'react'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Autoplay, Pagination])

const Carousel: FC<HTMLProps<HTMLElement>> = ({ children }: HTMLProps<HTMLElement>) => (
	<Swiper
		loop
		autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
		pagination={{
			clickable: true,
			type: 'bullets',
			bulletClass: 'w-4 opacity-70 inline-block h-1 mx-1 bg-white rounded cursor-pointer transition-width',
			bulletActiveClass: 'w-6 opacity-100',
		}}
	>
		{Children.map(children, (child) => (
			<SwiperSlide>{child}</SwiperSlide>
		))}
	</Swiper>
)

export default Carousel
