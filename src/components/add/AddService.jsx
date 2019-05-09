import React, { Component } from 'react';

import { Item, Input, Button, Dropdown } from 'semantic-ui-react'

export class AddService extends Component {

	constructor (props) {
		super(props)
		this.state = { type: '', serviceEndpoint: '', example: '' };
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeServiceEndpoint = this.onChangeServiceEndpoint.bind(this);
	}

	onClickAdd() {
		//this.setState({ operation: 'register', driverId: driverId, jobId: null, options: JSON.stringify(this.defaultOptions(driverId), null, 2) });
		alert(JSON.stringify(this.state));
	}

	onChangeType(e) {
		this.setState({ type: e.target.value });
	}

	onChangeServiceEndpoint(e) {
		this.setState({ serviceEndpoint: e.target.value });
	}

	onChangeExample(e, data) {
		this.setState({ type: data.value });
		this.setState({ example: '' });
	}

	render() {
		const examples = ['xdi', 'agent', 'hub'].map((example) => ({ text: example, value: example }));
		return (
			<tr>
				<td className="add-service">
					<Item className="service-label">SERVICE:</Item>
					<Input label='type' value={this.state.type} onChange={this.onChangeType} />
					<Input label='url' value={this.state.serviceEndpoint} onChange={this.onChangeServiceEndpoint} />
					<Button primary onClick={this.onClickAdd.bind(this)}>Add</Button>
					<Dropdown placeholder='Service' selection options={examples} value={this.state.example} onChange={this.onChangeExample.bind(this)} />
				</td>
			</tr>
		);
	}
}

export default AddService;
