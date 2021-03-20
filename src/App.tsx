import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LivePage from './pages/LivePage'
import VideoPlayPage from './pages/VideoPlayPage'

moment.locale('zh-cn')

const App: FC = () => (
	<ConfigProvider locale={zhCN}>
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/watch/:id" component={VideoPlayPage} />
				<Route exact path="/67373" component={LivePage} />
				<Route path="/" component={HomePage} />
			</Switch>
		</BrowserRouter>
	</ConfigProvider>
)

export default App
