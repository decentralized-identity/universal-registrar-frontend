import React, { Component } from 'react';

import { Highlight } from 'react-fast-highlight';

export class DidState extends Component {

	render() {
		const didState = this.props.didState == '' ? '' : JSON.stringify(this.props.didState, null, 2);
		return (
			<Highlight className='js'>
				{didState}
			</Highlight>
		);
	}
}

export default DidState;
