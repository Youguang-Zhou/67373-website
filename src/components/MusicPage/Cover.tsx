import styled from 'styled-components'

const Cover = styled.img<{ size: string }>`
	border-radius: 5px;
	height: ${({ size }) => size};
	width: ${({ size }) => size};
	object-fit: cover;
`

export default Cover
