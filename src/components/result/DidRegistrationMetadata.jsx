import React, { Component } from 'react';

import { Highlight } from 'react-fast-highlight';

export class DidRegistrationMetadata extends Component {

	render() {
		const didRegistrationMetadataString = this.props.didRegistrationMetadata ? JSON.stringify(this.props.didRegistrationMetadata, null, 2) : null;
		const didRegistrationMetadata = didRegistrationMetadataString ? (
			<Highlight className='js'>
				{didRegistrationMetadataString}
			</Highlight>
		) : null;
		return didRegistrationMetadata;
	}
}

export default DidRegistrationMetadata;
