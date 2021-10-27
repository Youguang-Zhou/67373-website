import React, { Children, FC, HTMLProps } from 'react'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper-bundle.min.css'

const Carousel: FC<HTMLProps<HTMLElement>> = ({ children }: HTMLProps<HTMLElement>) => (
	<Swiper
		loop
		modules={[Autoplay, Pagination]}
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
