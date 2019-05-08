import React, { Component } from 'react';
import axios from 'axios';

import { Segment, Item, Label, Divider, Button, Input, TextArea } from 'semantic-ui-react';
import { Highlight } from 'react-fast-highlight';

import AddPublicKey from './add/AddPublicKey';
import AddService from './add/AddService';

export class RegistrarInput extends Component {

	constructor (props) {
		super(props)
		this.state = { operation: null, driverId: null, jobId: null, options: null, secret: null };
		this.onChangeOptions = this.onChangeOptions.bind(this);
		this.onChangeSecret = this.onChangeSecret.bind(this);
	}

	onClickRegister(driverId) {
		this.setState({ operation: 'register', driverId: driverId, jobId: null, options: this.defaultOptions('register', driverId), secret: this.defaultSecret('register', driverId) });
    }

	onClickUpdate(driverId) {
		this.setState({ operation: 'update', driverId: driverId, jobId: null, options: this.defaultOptions('update', driverId), secret: this.defaultSecret('update', driverId) });
    }

	onClickRevoke(driverId) {
		this.setState({ operation: 'revoke', driverId: driverId, jobId: null, options: this.defaultOptions('revoke', driverId), secret: this.defaultSecret('revoke', driverId) });
    }

	onClickGo() {
		this.props.onLoading();
		var data = { 'jobId': this.state.jobId, 'options': JSON.parse(this.state.options), 'secret': JSON.parse(this.state.secret) };
		axios
			.post(env.backendUrl + '1.0/' + this.state.operation + '?' + encodeURIComponent(this.state.driverId), JSON.stringify(data))
			.then(response => {
				const didState = response.data.didState;
				const jobId = response.data.jobId;
				const registrarMetadata = response.data.registrarMetadata;
				const methodMetadata = response.data.methodMetadata;
				this.setState({ jobId: jobId });
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

	onClickClear() {
		this.setState({ operation: null, driverId: null, jobId: null, options: null, secret: null });
		this.props.onClear();
    }

	onChangeOptions(e) {
		this.setState({ options: e.target.value });
	}

	onChangeSecret(e) {
		this.setState({ secret: e.target.value });
	}

    render() {
    	var jobIdItem;
    	if (this.state.jobId) {
    		jobIdItem = (
    			<Segment>
					<span className="jobid-label">JOB ID: </span>
					<span className="jobid">{this.state.jobId}</span>
				</Segment>
    		);
    	}

		var goClearButtons;
		if (this.state.operation && this.state.driverId) {
			goClearButtons = (
				<Item>
					{jobIdItem}
	                <Button primary onClick={this.onClickGo.bind(this)}>{this.state.operation} → {this.state.driverId}</Button>
	                <Button secondary onClick={this.onClickClear.bind(this)}>Clear</Button>
	            </Item>
			);
		}

    	var registerButtons;
    	var updateButtons;
    	var revokeButtons;
		if (! this.state.operation) {
			const registerButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i} onClick={this.onClickRegister.bind(this, driver.key)}>{driver.name}</Button>
			);
			registerButtons = (
				<Item className="buttons"><Label>Register:</Label>{registerButtonsList}</Item>
			);
			const updateButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i} onClick={this.onClickUpdate.bind(this, driver.key)}>{driver.name}</Button>
			);
			updateButtons = (
				<Item className="buttons"><Label>Update:</Label>{updateButtonsList}</Item>
			);
			const revokeButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i} onClick={this.onClickRevoke.bind(this, driver.key)}>{driver.name}</Button>
			);
			revokeButtons = (
				<Item className="buttons"><Label>Revoke:</Label>{revokeButtonsList}</Item>
			);
		}

    	var optionsInput;
    	if (this.state.options) {
    		optionsInput = (
    			<td>
	    			<Item>
	    				<Item className="options-label">OPTIONS:</Item>
						<TextArea className="options" value={this.state.options} cols='60' rows='5' onChange={this.onChangeOptions} />
					</Item>
				</td>
    		);
    	}

    	var secretInput;
    	if (this.state.secret) {
    		secretInput = (
    			<td>
	    			<Item>
	    				<Item className="secret-label">SECRET:</Item>
						<TextArea className="secret" value={this.state.secret} cols='60' rows='5' onChange={this.onChangeSecret} />
					</Item>
				</td>
    		);
    	}

		var optionsSecretInput;
		if (this.state.options || this.state.secret) {
			optionsSecretInput = (
				<table>
					<tr>
						{optionsInput}
						{secretInput}
					</tr>
				</table>
			);
		}

		var addPublicKeyService;
		if ("register" === this.state.operation || "update" === this.state.operation) {
			addPublicKeyService = (
				<table>
					<AddService />
					<AddPublicKey />
				</table>
			);
		}

        return (
        	<Segment className="registrar-input">
				{goClearButtons}
				{registerButtons}
				{updateButtons}
				{revokeButtons}
				{optionsSecretInput}
				{addPublicKeyService}
			</Segment>
        );
    }

	defaultOptions(operation, driverId) {
		const options = {
			'register': {
				'did:btcr': { 'chain': 'TESTNET' },
				'did:sov': { 'network': 'builder' },
				'did:v1': { },
				'did:erc725': { }
			},
			'update': {
				'did:btcr': { 'chain': 'TESTNET' },
				'did:sov': { 'network': 'builder' },
				'did:v1': { },
				'did:erc725': { }
			},
			'revoke': {
				'did:btcr': { 'chain': 'TESTNET' },
				'did:sov': { 'network': 'builder' },
				'did:v1': { },
				'did:erc725': { }
			}
		};
		return options[operation][driverId] ? JSON.stringify(options[operation][driverId], null, 2): null;
	}

	defaultSecret(operation, driverId) {
		const secret = {
			'register': {
				'did:btcr': null,
				'did:sov': null,
				'did:v1': null,
				'did:erc725': null
			},
			'update': {
				'did:btcr': { 'privateKeyWiF': '...' },
				'did:sov': { 'seed': '...' },
				'did:v1': { },
				'did:erc725': { }
			},
			'revoke': {
				'did:btcr': { 'privateKeyWiF': '...' },
				'did:sov': { 'seed': '...' },
				'did:v1': { },
				'did:erc725': { }
			}
		};
		return secret[operation][driverId] ? JSON.stringify(secret[operation][driverId], null, 2): null;
	}
}

export default RegistrarInput;
