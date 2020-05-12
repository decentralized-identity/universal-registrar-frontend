import React, { Component } from 'react';

import { Item, Input, Button, Dropdown, Label } from 'semantic-ui-react'

export class AddService extends Component {

	constructor (props) {
		super(props)
		this.state = { type: 'agent', serviceEndpoint: 'http://localhost/', example: '' };
	}

	onClickAdd() {
		var service = {
			'type': this.state.type,
			'serviceEndpoint': this.state.serviceEndpoint
		};
		this.props.onAddService(service);
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
			<table className="add-service">
				<tbody>
					<tr>
						<td>
							<label htmlFor={'serviceTypeSelect'} hidden={true}>Service Type</label>
							<Dropdown id={'serviceTypeSelect'} placeholder='type' selection options={examples} value={this.state.example} onChange={this.onChangeExample.bind(this)} />
							<label htmlFor={'serviceTypeInput'} hidden={true}>Service Type</label>
							<Input id={'serviceTypeInput'} value={this.state.type} onChange={this.onChangeType.bind(this)} />
							<label htmlFor={'url'} hidden={true}>Service Type</label>
							<Input id={'url'} label='url' value={this.state.serviceEndpoint} onChange={this.onChangeServiceEndpoint.bind(this)} />
							<Button primary onClick={this.onClickAdd.bind(this)}>Add</Button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default AddService;
