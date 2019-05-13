import React, { Component } from 'react';

import { Grid, Column, List, Item, Icon, Button } from 'semantic-ui-react'

export class Service extends Component {

	onClickRemove() {
		this.props.onRemoveService(this.props.i);
	}

	render() {
		const icon = 'wifi';
		return (
			<Item className="service">
				<table><tr>
				<td><Icon className={icon} /></td>
				<td className='type'>{this.props.type}</td>
				<td>→</td>
				<td className='serviceendpoint'>{this.props.serviceEndpoint}</td>
				<td><Button secondary onClick={this.onClickRemove.bind(this)}>Remove</Button></td>
				</tr></table>
			</Item>
		);
	}
}

export default Service;
