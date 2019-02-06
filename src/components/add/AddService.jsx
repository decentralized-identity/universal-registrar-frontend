import React, { Component } from 'react';

import { Item, Input, Button, Dropdown } from 'semantic-ui-react'

export class AddService extends Component {

	constructor (props) {
		super(props)
		this.state = { input: '', example: '' };
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	onClickAdd() {
		//this.setState({ operation: 'register', driverId: driverId, jobId: null, options: JSON.stringify(this.defaultOptions(driverId), null, 2) });
    }

	onChangeExample(e, data) {
		this.setState({ example: data.value });
    }

	onChangeInput(e) {
		this.setState({ input: e.target.value });
	}

//    			<Dropdown placeholder='Service' selection options={examples} value={this.state.example} onChange={this.onChangeExample.bind(this)} />

    render() {
    	const examples = ['xdi', 'agent', 'hub'].map((example) => ({ text: example, value: example }));
        return (
        	<tr>
	        	<td className="add-service">
	        		<Item className="service-label">SERVICE:</Item>
					<Input label='service' value={this.state.input} onChange={this.onChangeInput} />
					<Button primary onClick={this.onClickAdd.bind(this)}>Add</Button>
				</td>
			</tr>
        );
    }
}

export default AddService;
