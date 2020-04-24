import React, { Component } from 'react';

import Drivers from './Drivers';
import Heading from './Heading';
import Registrar  from './Registrar';
import Footer from './Footer';

export class App extends Component {

	constructor (props) {
		super(props);
		this.state = { drivers: [
			{id: 'driver-universalregistrar/driver-did-btcr', name: 'did-btcr'},
			{id: 'driver-universalregistrar/driver-did-sov', name: 'did-sov'},
			{id: 'driver-universalregistrar/driver-did-v1', name: 'did-v1'},
			{id: 'driver-universalregistrar/driver-did-key', name: 'did-key'}
		] };
	}

	render() {
		return (
			<div className="app">
				<Drivers drivers={this.state.drivers} />
				<Heading />
				<Registrar drivers={this.state.drivers} />
				<Footer />
			</div>
		);
	}
}

export default App;
