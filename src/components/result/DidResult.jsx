import React, { Component } from 'react';

import { Segment, Item, Divider } from 'semantic-ui-react';
import { Highlight } from 'react-fast-highlight';

export class DidResult extends Component {

	render() {
		const jobId = this.props.jobId;
		const state = this.props.didState.state;
		const did = this.props.didState.did;
		const secret = JSON.stringify(this.props.didState.secret, null, 2);

		var stateClass = 'state-' + state;

		var jobIdItem;
		if (jobId) jobIdItem = (
			<Item>
				<span className="jobid-label">JOBID:</span> <span className="jobid">{jobId}</span>
			</Item>
		);

		var stateItem;
		if (state) stateItem = (
			<Item className="state-item">
				<span className="state-label">STATE:</span> <span className={stateClass}>{state}</span>
			</Item>
		);

		var didItem;
		if (did) didItem = (
			<Segment>
				<Item className='did-label'>
					DID:
				</Item>
				<Item className='did'>
					{did}
				</Item>
			</Segment>
		);

		var secretItem;
		if (secret) secretItem = (
			<Segment>
				<Item className='secret-label'>
					SECRET:
				</Item>
				<Highlight className='secret'>
					{secret}
				</Highlight>
			</Segment>
		);

		return (
			<div className='did-result'>
				{jobIdItem}
				{stateItem}
				{didItem}
				{secretItem}
			</div>
		);
	}
}

export default DidResult;
