import React, { Component } from 'react';
import axios from 'axios';

import { Segment, Item, Label, Divider, Button } from 'semantic-ui-react'

export class RegistrarInput extends Component {

	constructor (props) {
		super(props)
		this.state = { };
	}

	onClickRegister(driverName) {
		this.props.onLoading();
		axios
			.get(env.backendUrl + '1.0/identifiers/' + encodeURIComponent(this.state.input))
			.then(response => {
				const didReference = response.data.didReference;
				const didDocument = response.data.didDocument;
				const registrarMetadata = response.data.registrarMetadata;
				const methodMetadata = response.data.methodMetadata;
				this.props.onResult(didReference, didDocument, registrarMetadata, methodMetadata);
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
			<Button primary key={i} onClick={this.onClickRegister.bind(this, driver.name)}>{driver.name}</Button>
		);
		const updateButtons = this.props.drivers.map((driver, i) =>
			<Button primary key={i} onClick={this.onClickUpdate.bind(this, driver.name)}>{driver.name}</Button>
		);
		const revokeButtons = this.props.drivers.map((driver, i) =>
			<Button primary key={i} onClick={this.onClickRevoke.bind(this, driver.name)}>{driver.name}</Button>
		);
        return (
        	<Segment className="registrar-input">
        		<Item><Label>Register:</Label> {registerButtons}</Item> 
        		<Divider/>
        		<Item><Label>Update:</Label> {updateButtons}</Item>
        		<Divider/>
        		<Item><Label>Revoke:</Label> {revokeButtons}</Item>
			</Segment>
        );
    }
}

export default RegistrarInput;
