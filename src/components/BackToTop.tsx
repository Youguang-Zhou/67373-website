import React from 'react'
import xiaode from '../assets/xiaode.png'

const BackToTop = () => (
	<button
		onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
		className="fixed p-1 bg-white rounded-full shadow bottom-10 right-10 md:bottom-20 md:right-20"
	>
		<img src={xiaode} alt="backToTop" className="w-16 h-16 md:w-20 md:h-20" />
	</button>
)

export default BackToTop
