// Main App Router
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import Components
import Welcome from './components/Welcome'
import PosterMaker from './components/PosterMaker'

// Main Router between Welcome screen and PoserMaker page
const AppRouter = () => (
	<main>
		<Switch>
	      <Route exact path='/' component={Welcome}/>
	      <Route exact path='/poster-maker' component={PosterMaker}/>
	    </Switch>
	</main>
)

export default AppRouter
