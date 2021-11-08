import { orange } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import moment from 'moment'
import 'moment/locale/zh-cn'
import React, { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { LyricProvider } from './contexts/LyricContext'
import { MusicProvider } from './contexts/MusicContext'
import ChannelPage from './pages/ChannelPage'
import HomePage from './pages/HomePage'
import MusicPage from './pages/MusicPage'
import SearchResultsPage from './pages/SearchResultsPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import VideoPlayPage from './pages/VideoPlayPage'

moment.locale('zh-cn')

const MUI_THEME = createTheme({ palette: { primary: orange } })

const App: FC = () => (
	<ThemeProvider theme={MUI_THEME}>
		<MusicProvider>
			<LyricProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/channel" element={<ChannelPage />} />
						<Route path="/music" element={<MusicPage />} />
						<Route path="/music/:id" element={<MusicPage />} />
						<Route path="/watch/:id" element={<VideoPlayPage />} />
						<Route path="/search" element={<SearchResultsPage />} />
						<Route path="/terms" element={<TermsOfUsePage />} />
						<Route path="/" element={<HomePage />} />
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</LyricProvider>
		</MusicProvider>
	</ThemeProvider>
)

export default App
