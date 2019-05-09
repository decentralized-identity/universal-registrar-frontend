import React, { Component } from 'react';

import Drivers from './Drivers';
import Heading from './Heading';
import Registrar  from './Registrar';
import Footer from './Footer';

export class App extends Component {

	constructor (props) {
		super(props);
		this.state = { drivers: [
			{key: 'did:btcr', name: 'did:btcr'}, 
			{key: 'did:sov', name: 'did:sov'},
			{key: 'did:v1', name: 'did:v1'},
			{key: 'did:erc725', name: 'did:erc725'}
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
