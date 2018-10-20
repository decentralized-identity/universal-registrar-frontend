import React, { Component } from 'react';
import axios from 'axios';

import { Segment, Item, Label, Divider, Button } from 'semantic-ui-react'

export class RegistrarInput extends Component {

	constructor (props) {
		super(props)
		this.state = { };
	}

	onClickRegister(driverId) {
		this.props.onLoading();
		var data = {'jobId':null,'options':{'network':'danube'}};
		axios
			.post(env.backendUrl + '1.0/register?' + encodeURIComponent(driverId), JSON.stringify(data))
			.then(response => {
				const didState = response.data.didState;
				const jobId = response.data.jobId;
				const registrarMetadata = response.data.registrarMetadata;
				const methodMetadata = response.data.methodMetadata;
				this.props.onResult(didState, jobId, registrarMetadata, methodMetadata);
			})
			.catch(error => {
				if (error.response !== undefined && error.response.data !== undefined) {
					this.props.onError(error.response.data);
			    } else if (error.request !== undefined) {
					this.props.onError(String(error) + ": " + JSON.stringify(error.request));
			    } else if (error.message !== undefined) {
					this.props.onError(error.message);
			    } else {
					this.props.onError(String(error));
			    }
			});
    }

	onClickUpdate(driverName) {
		this.props.onLoading();
    }

	onClickRevoke(driverName) {
		this.props.onLoading();
    }

	onClickClear() {
		this.props.onClear();
    }

    render() {
		const registerButtons = this.props.drivers.map((driver, i) =>
			<Button secondary key={i} onClick={this.onClickRegister.bind(this, driver.key)}>{driver.name}</Button>
		);
		const updateButtons = this.props.drivers.map((driver, i) =>
			<Button secondary key={i} onClick={this.onClickUpdate.bind(this, driver.key)}>{driver.name}</Button>
		);
		const revokeButtons = this.props.drivers.map((driver, i) =>
			<Button secondary key={i} onClick={this.onClickRevoke.bind(this, driver.key)}>{driver.name}</Button>
		);
        return (
        	<Segment className="registrar-input">
        		<Item><Label>Register:</Label> {registerButtons}</Item> 
			</Segment>
        );
    }
}

export default RegistrarInput;
