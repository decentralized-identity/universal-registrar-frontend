import React, { Component } from 'react';

import Drivers from './Drivers';
import Heading from './Heading';
import Registrar  from './Registrar';
import Footer from './Footer';

export class App extends Component {

	constructor (props) {
		super(props);
		this.state = { drivers: [
			{method: 'btcr', name: 'did:btcr'},
			{method: 'sov', name: 'did:sov'},
			{method: 'v1', name: 'did:v1'},
			{method: 'key', name: 'did:key'},
			{method: 'ion', name: 'did:ion'},
			{method: 'web', name: 'did:web'},
			{method: 'ebsi', name: 'did:ebsi'},
			{method: 'oyd', name: 'did:oyd'},
			{method: 'cheqd', name: 'did:cheqd'},
			{method: 'ethr', name: 'did:ethr'},
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
