import React, { Component } from 'react';

import { Highlight } from 'react-fast-highlight';

export class RegistrarMetadata extends Component {

	render() {
		const registrarMetadata = this.props.registrarMetadata == '' ? '' : JSON.stringify(this.props.registrarMetadata, null, 2);
		return (
			<Highlight className='js'>
				{registrarMetadata}
			</Highlight>
		);
	}
}

export default RegistrarMetadata;
