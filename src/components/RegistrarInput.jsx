import React, {Component} from 'react';
import axios from 'axios';

import {Button, Divider, Form, Grid, Input, Item, Label, List, Segment, Table, TextArea} from 'semantic-ui-react';

import AddPublicKey from './add/AddPublicKey';
import AddService from './add/AddService';
import Service from './add/Service';

export class RegistrarInput extends Component {

	constructor(props) {
		super(props)
		this.state = {
			operation: null,
			driverId: null,
			driverName: null,
			jobId: null,
			identifier: null,
			options: null,
			secret: null,
			addServices: [],
			addPublicKeys: [],
			addAuthentications: []
		};
	}

	execute() {
		var data;

		if ("update" === this.state.operation || "deactivate" === this.state.operation) {
			data = {
				'jobId': this.state.jobId,
				'identifier': this.state.identifier,
				'options': JSON.parse(this.state.options),
				'secret': JSON.parse(this.state.secret),
				'didDocument': {
					'service': this.state.addServices,
					'publicKey': this.state.addPublicKeys,
					'authentication': this.state.addAuthentications
				}
			};
		}

		if ("register" === this.state.operation) {
			data = {
				'jobId': this.state.jobId,
				'options': JSON.parse(this.state.options),
				'secret': JSON.parse(this.state.secret),
				'didDocument': {
					'service': this.state.addServices,
					'publicKey': this.state.addPublicKeys,
					'authentication': this.state.addAuthentications
				}
			};
		}

		axios
			.post(env.backendUrl + '1.0/' + this.state.operation + '?' + 'driverId=' + encodeURIComponent(this.state.driverId), JSON.stringify(data))
			.then(response => {
				const didState = response.data.didState;
				const jobId = response.data.jobId;
				const registrarMetadata = response.data.registrarMetadata;
				const methodMetadata = response.data.methodMetadata;
				this.setState({jobId: jobId});
				this.props.onResult(didState, jobId, registrarMetadata, methodMetadata);
			})
			.catch(error => {
				if (error.response && error.response.data) {
					var errorString;
					if (error.response.status === 404)
						errorString = "No result for " + this.state.input;
					else
						errorString = String(error);
					if (typeof error.response.data === 'object') {
						const didState = error.response.data.didState;
						const jobId = error.response.data.jobId;
						const registrarMetadata = error.response.data.registrarMetadata;
						const methodMetadata = error.response.data.methodMetadata;
						this.props.onError(errorString, didState, jobId, registrarMetadata, methodMetadata);
					} else {
						this.props.onError(errorString + ': ' + error.response.data);
					}
				} else if (error.request) {
					this.props.onError(String(error) + ": " + JSON.stringify(error.request));
				} else if (error.message) {
					this.props.onError(error.message);
				} else {
					this.props.onError(String(error));
				}
			});
	}

	onClickRegister(driverId, driverName) {
		this.setState({
			operation: 'register',
			driverId: driverId,
			driverName: driverName,
			jobId: null,
			identifier: null,
			options: this.defaultOptions('register', driverId),
			secret: this.defaultSecret('register', driverId)
		});
	}

	onClickUpdate(driverId, driverName) {
		this.setState({
			operation: 'update',
			driverId: driverId,
			driverName: driverName,
			jobId: null,
			identifier: null,
			options: this.defaultOptions('update', driverId),
			secret: this.defaultSecret('update', driverId)
		});
	}

	onClickDeactivate(driverId, driverName) {
		this.setState({
			operation: 'deactivate',
			driverId: driverId,
			driverName: driverName,
			jobId: null,
			identifier: null,
			options: this.defaultOptions('deactivate', driverId),
			secret: this.defaultSecret('deactivate', driverId)
		});
	}

	onClickExecute() {
		this.props.onLoading();
		this.execute();
	}

	onClickJobCheck(e) {
		this.props.onLoading();
		this.execute();
		e.preventDefault();
	}

	onClickClear() {
		this.setState({
			operation: null,
			driverId: null,
			driverName: null,
			jobId: null,
			identifier: null,
			options: null,
			secret: null,
			addServices: [],
			addPublicKeys: [],
			addAuthentications: []
		});
		this.props.onClear();
	}

	onChangeOptions(e) {
		this.setState({options: e.target.value});
	}

	onChangeSecret(e) {
		this.setState({secret: e.target.value});
	}

	onChangeJobId(e) {
		this.setState({jobId: e.target.value});
	}

	onChangeIdentifier(e) {
		this.setState({identifier: e.target.value});
	}

	onAddService(service) {
		this.setState({addServices: [...this.state.addServices, service]});
	}

	onAddPublicKey(publicKey) {
		this.setState({addPublicKeys: [...this.state.addPublicKeys, publicKey]});
	}

	onAddAuthentication(authentication) {
		this.setState({addAuthentications: [...this.state.addAuthentications, authentication]});
	}

	onRemoveService(i) {
		var addServices = this.state.addServices;
		addServices.splice(i, 1);
		this.setState({addServices: addServices});
	}

	render() {
		var jobIdInput;
		if (this.state.operation) {
			jobIdInput = (
				<Grid.Column width='10'>
					<Form onSubmit={this.onClickJobCheck.bind(this)}>
						<Form.Group inline>
							<Form.Input label='JOB ID:' placeholder='...'
										width='6'
										value={this.state.jobId}
										onChange={this.onChangeJobId.bind(this)}/>
							<Form.Button primary>Check State</Form.Button>
						</Form.Group>
					</Form>
				</Grid.Column>
			);
		}

		var executeClearButtons;
		if (this.state.operation && this.state.driverId) {
			executeClearButtons = (
				<Grid columns='16' divided>
					<Grid.Row>
						<Grid.Column width='4'>
							<Item>
								<Button primary
										onClick={this.onClickExecute.bind(this)}>{this.state.operation} → {this.state.driverName}</Button>
								<Button secondary onClick={this.onClickClear.bind(this)}>Clear</Button>
							</Item>
						</Grid.Column>
						{jobIdInput}
					</Grid.Row>
				</Grid>
			)
			;
		}


		var registerButtons;
		var updateButtons;
		var deactivateButtons;
		if (!this.state.operation) {
			const registerButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i}
						onClick={this.onClickRegister.bind(this, driver.id, driver.name)}>{driver.name}</Button>
			);
			registerButtons = (
				<Item className="buttons"><Label><label htmlFor={'registerButtonsList'}>Register:</label></Label><span
					id={'registerButtonsList'}>{registerButtonsList}</span></Item>
			);
			const updateButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i}
						onClick={this.onClickUpdate.bind(this, driver.id, driver.name)}>{driver.name}</Button>
			);
			updateButtons = (
				<Item className="buttons"><Label><label htmlFor={'updateButtonsList'}>Update:</label></Label><span
					id={'updateButtonsList'}>{updateButtonsList}</span></Item>
			);
			const deactivateButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i}
						onClick={this.onClickDeactivate.bind(this, driver.id, driver.name)}>{driver.name}</Button>
			);
			deactivateButtons = (
				<Item className="buttons"><Label><label
					htmlFor={'deactivateButtonsList'}>Deactivate:</label></Label><span
					id={'deactivateButtonsList'}>{deactivateButtonsList}</span></Item>
			);
		}

		var identifierInput;
		if ("update" === this.state.operation || "deactivate" === this.state.operation) {
			identifierInput = (
				<Input focus
					   label="Identifier* "
					   value={this.state.identifier}
					   placeholder="DID..."
					   onChange={this.onChangeIdentifier.bind(this)}/>
			);
		}

		var optionsInput;
		if (this.state.options !== null) {
			optionsInput = (
				<Table.Cell>
					<Item>
						<Item className="options-label" for={'optionsInput'}>OPTIONS:</Item>
						<TextArea id={'optionsInput'} className="options" value={this.state.options} cols='60' rows='5'
								  onChange={this.onChangeOptions.bind(this)}/>
					</Item>
				</Table.Cell>
			);
		}

		var secretInput;
		if (this.state.secret != null) {
			secretInput = (
				<Table.Cell>
					<Item>
						<Item className="secret-label" for={'secretInput'}>SECRET:</Item>
						<TextArea id={'secretInput'} className="secret" value={this.state.secret} cols='60' rows='5'
								  onChange={this.onChangeSecret.bind(this)}/>
					</Item>
				</Table.Cell>
			);
		}

		var optionsSecretInput;
		if (optionsInput || secretInput) {
			optionsSecretInput = (
				<Table>
					<Table.Row>
						<Item.Group>
							{optionsInput}
							{secretInput}
						</Item.Group>
					</Table.Row>
				</Table>
			);
		}

		var addServicesContainer;
		if ("register" === this.state.operation || "update" === this.state.operation) {
			const addService = (
				<AddService onAddService={this.onAddService.bind(this)}/>
			);
			const addPublicKey = (
				<AddPublicKey onAddPublicKey={this.onAddPublicKey.bind(this)}/>
			);

			const addServices = this.state.addServices.map((addService, i) =>
				<Service
					key={i}
					i={i}
					type={addService.type}
					serviceEndpoint={addService.serviceEndpoint}
					onRemoveService={this.onRemoveService.bind(this)}/>
			);
			var addServicesList;
			if (Object.keys(addServices).length > 0) {
				addServicesList = (
					<List>
						{addServices}
					</List>
				);
			}

			addServicesContainer = (
				<div>
					<Divider/>
					<label htmlFor={'services'} className="label">SERVICES:</label>
					{addService}
					{addServicesList}
				</div>
			);
		}

		return (
			<Segment className="registrar-input">
				{executeClearButtons}
				{registerButtons}
				{updateButtons}
				{deactivateButtons}
				{identifierInput}
				{optionsSecretInput}
				{addServicesContainer}
			</Segment>
		);
	}

	defaultOptions(operation, driverId) {
		const options = {
			'register': {
				'driver-universalregistrar/driver-did-btcr': {'chain': 'TESTNET'},
				'driver-universalregistrar/driver-did-sov': {'network': 'danube'},
				'driver-universalregistrar/driver-did-v1': {'ledger': 'test', 'keytype': 'ed25519'},
				'driver-universalregistrar/driver-did-key': {'keyType': 'Ed25519VerificationKey2018'}
			},
			'update': {
				'driver-universalregistrar/driver-did-btcr': {'chain': 'TESTNET'},
				'driver-universalregistrar/driver-did-sov': {},
				'driver-universalregistrar/driver-did-v1': {'ledger': 'test'},
				'driver-universalregistrar/driver-did-key': {}
			},
			'deactivate': {
				'driver-universalregistrar/driver-did-btcr': {'chain': 'TESTNET'},
				'driver-universalregistrar/driver-did-sov': {'network': 'danube'},
				'driver-universalregistrar/driver-did-v1': {'ledger': 'test'},
				'driver-universalregistrar/driver-did-key': {}
			}
		};
		return options[operation][driverId] ? JSON.stringify(options[operation][driverId], null, 2) : null;
	}

	defaultSecret(operation, driverId) {
		const secret = {
			'register': {
				'driver-universalregistrar/driver-did-btcr': {'privateKeyWiF': null},
				'driver-universalregistrar/driver-did-sov': {'seed': null},
				'driver-universalregistrar/driver-did-v1': {},
				'driver-universalregistrar/driver-did-key': {}
			},
			'update': {
				'driver-universalregistrar/driver-did-btcr': {'privateKeyWiF': '...'},
				'driver-universalregistrar/driver-did-sov': {'seed': '...'},
				'driver-universalregistrar/driver-did-v1': {},
				'driver-universalregistrar/driver-did-key': {}
			},
			'deactivate': {
				'driver-universalregistrar/driver-did-btcr': {'privateKeyWiF': '...'},
				'driver-universalregistrar/driver-did-sov': {'seed': '...'},
				'driver-universalregistrar/driver-did-v1': {},
				'driver-universalregistrar/driver-did-key': {}
			}
		};
		return secret[operation][driverId] ? JSON.stringify(secret[operation][driverId], null, 2) : null;
	}
}

export default RegistrarInput;
