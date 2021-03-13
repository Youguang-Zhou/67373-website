import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LivePage from './pages/LivePage'

const App: FC = () => (
	<BrowserRouter>
		<Header />
		<Switch>
			<Route exact path="/67373" component={LivePage} />
			<Route path="/" component={HomePage} />
		</Switch>
	</BrowserRouter>
)

export default App
