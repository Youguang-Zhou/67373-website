import { orange } from '@material-ui/core/colors'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import moment from 'moment'
import 'moment-duration-format'
import 'moment/locale/zh-cn'
import React, { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { LyricProvider } from './contexts/LyricContext'
import { MusicProvider } from './contexts/MusicContext'
import ChannelPage from './pages/ChannelPage'
import HomePage from './pages/HomePage'
import LivePage from './pages/LivePage'
import MusicPage from './pages/MusicPage'
import SearchResultsPage from './pages/SearchResultsPage'
import VideoPlayPage from './pages/VideoPlayPage'

moment.locale('zh-cn')

// material-ui的主题
const theme = createTheme({ palette: { primary: orange } })

const App: FC = () => (
	<ThemeProvider theme={theme}>
		<MusicProvider>
			<LyricProvider>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route exact path="/channel" component={ChannelPage} />
						<Route exact path="/music" component={MusicPage} />
						<Route exact path="/music/:id" component={MusicPage} />
						<Route exact path="/67373" component={LivePage} />
						<Route exact path="/watch/:id" component={VideoPlayPage} />
						<Route exact path="/search" component={SearchResultsPage} />
						<Route exact path="/" component={HomePage} />
						<Redirect to="/" />
					</Switch>
					<Footer />
				</BrowserRouter>
			</LyricProvider>
		</MusicProvider>
	</ThemeProvider>
)

export default App
