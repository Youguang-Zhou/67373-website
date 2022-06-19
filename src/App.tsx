import { ThemeProvider } from '@mui/material/styles'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { LyricProvider } from './contexts/LyricContext'
import { MusicProvider } from './contexts/MusicContext'
import { NotificationProvider } from './contexts/NotificationContext'
import ChannelPage from './pages/ChannelPage'
import HomePage from './pages/HomePage'
import MusicPage from './pages/MusicPage'
import MusicPlayPage from './pages/MusicPlayPage'
import SearchResultsPage from './pages/SearchResultsPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import VideoPlayPage from './pages/VideoPlayPage'
import { muiTheme, queryClient } from './utils/constants'

moment.locale('zh-cn')

const App = () => (
	<ThemeProvider theme={muiTheme}>
		<QueryClientProvider client={queryClient}>
			<NotificationProvider value={undefined}>
				<MusicProvider value={undefined}>
					<LyricProvider value={undefined}>
						<BrowserRouter>
							<Header />
							<Routes>
								<Route path="/channel" element={<ChannelPage />} />
								<Route path="/music" element={<MusicPage />}>
									<Route path=":id" element={<MusicPlayPage />} />
								</Route>
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
			</NotificationProvider>
		</QueryClientProvider>
	</ThemeProvider>
)

export default App
