import React, { Component } from 'react';

import { Segment, Item, Divider } from 'semantic-ui-react'
import { Highlight } from 'react-fast-highlight';

export class DidResult extends Component {

	render() {
		const jobId = this.props.didState.jobId;
		const state = this.props.didState.state;
		const identifier = this.props.didState.identifier;
		const secret = JSON.stringify(this.props.didState.credentials, null, 2);

		var stateClass = 'state-' + state;

		var jobIdItem;
		if (jobId) jobIdItem = (
    		<Item>
    			JOBID: {jobId}
    		</Item>
		);

		var stateItem;
		if (state) stateItem = (
    		<Item>
    			STATE: <span className={stateClass}>{state}</span>
    		</Item>
		);

		var identifierItem;
		if (identifier) identifierItem = (
    		<Segment>
    			<Item className='identifier-label'>
    				IDENTIFIER:
    			</Item>
		       	<Highlight className='js identifier'>
        			{identifier}
        		</Highlight>
    		</Segment>
		);

		var secretItem;
		if (secret) secretItem = (
    		<Segment>
    			<Item className='secret-label'>
    				SECRET:
    			</Item>
		       	<Highlight className='js secret'>
        			{secret}
        		</Highlight>
    		</Segment>
		);

        return (
        	<div className='did-result'>
        		{jobIdItem}
        		{stateItem}
        		{identifierItem}
        		{secretItem}
        	</div>
        );
    }
}

export default DidResult;
