import React, { Component } from 'react';

import { Segment, Grid, Image, Header } from 'semantic-ui-react'

export class Footer extends Component {

	render() {
		return (
			<Segment className='footer'>
				See <a href="https://github.com/decentralized-identity/universal-registrar/">here</a> for more information about the Universal Registrar.
			</Segment>
		);
	}

}

export default Footer;
