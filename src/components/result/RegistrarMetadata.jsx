import React, { Component } from 'react';

import { Highlight } from 'react-fast-highlight';

export class RegistrarMetadata extends Component {

	render() {
		const registrarMetadataString = this.props.registrarMetadata ? JSON.stringify(this.props.registrarMetadata, null, 2) : null;
		const registrarMetadata = registrarMetadataString ? (
			<Highlight className='js'>
				{registrarMetadataString}
			</Highlight>
		) : null;
		return registrarMetadata;
	}
}

export default RegistrarMetadata;
