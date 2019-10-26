import React, { Component } from 'react';

import { Segment, Icon } from 'semantic-ui-react'

export class Footer extends Component {

	render() {
		return (
			<Segment className='footer'>
				<Icon className="blue info circle" />
				See <a href="https://github.com/decentralized-identity/universal-registrar/">here</a> for more information about the Universal Registrar.
			</Segment>
		);
	}
}

export default Footer;
