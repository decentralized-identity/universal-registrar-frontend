import React, { Component } from 'react';

import { Highlight } from 'react-fast-highlight';

export class DidState extends Component {

	render() {
		const didStateString = this.props.didState ? JSON.stringify(this.props.didState, null, 2) : null;
		const didState = didStateString ? (
			<Highlight className='js'>
				{didStateString}
			</Highlight>
		) : null;
		return didState;
	}
}

export default DidState;
