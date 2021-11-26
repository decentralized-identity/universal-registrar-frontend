import React, {Component} from 'react';
import axios from 'axios';

import {Button, Divider, Form, Grid, Input, Item, Label, List, Segment, Table, TextArea} from 'semantic-ui-react';

export class RegistrarInput extends Component {

	constructor(props) {
		super(props)
		this.state = {
			operation: null,
			method: null,
			driverName: null,
			jobId: null,
			identifier: null,
			options: null,
			secret: null,
			didDocument: null
		};
	}

	execute() {
		var data;
		try {
			var operation;
			if ("create" === this.state.operation) {
				operation = 'create';
				data = {
					'jobId': this.state.jobId,
					'options': JSON.parse(this.state.options),
					'secret': JSON.parse(this.state.secret),
					'didDocument': JSON.parse(this.state.didDocument)
				};
			}
			if ("update" === this.state.operation || "deactivate" === this.state.operation) {
				operation = this.state.operation;
				data = {
					'jobId': this.state.jobId,
					'identifier': this.state.identifier,
					'options': JSON.parse(this.state.options),
					'secret': JSON.parse(this.state.secret),
					'didDocument': JSON.parse(this.state.didDocument)
				};
			}
		} catch (error) {
			this.props.onError(error.name + ': ' + error.message);
			return;
		}

		const url = env.backendUrl + '1.0/' + operation + '?' + 'method=' + encodeURIComponent(this.state.method);
		const body = JSON.stringify(data);
		const config = {'headers': {'Content-Type': 'application/json'}};
		axios
			.post(url, body, config)
			.then(response => {
				const didState = response.data.didState;
				const jobId = response.data.jobId;
				const didRegistrationMetadata = response.data.didRegistrationMetadata;
				const didDocumentMetadata = response.data.didDocumentMetadata;
				this.setState({jobId: jobId});
				this.props.onResult(didState, jobId, didRegistrationMetadata, didDocumentMetadata);
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
						const didRegistrationMetadata = error.response.data.didRegistrationMetadata ? error.response.data.didRegistrationMetadata : error.response.data;
						const didDocumentMetadata = error.response.data.didDocumentMetadata;
						this.props.onError(errorString, didState, jobId, didRegistrationMetadata, didDocumentMetadata);
					} else {
						this.props.onError(errorString + ': ' + error.response.data);
					}
				} else if (error.request) {
					this.props.onError(String(error) + ": " + JSON.stringify(error.request));
				} else if (error.name && error.message) {
					this.props.onError(error.name + ': ' + error.message);
				} else {
					this.props.onError(String(error));
				}
			});
	}

	onClickCreate(method, driverName) {
		this.setState({
			operation: 'create',
			method: method,
			driverName: driverName,
			jobId: null,
			identifier: null,
			options: this.defaultOptions('create', method),
			secret: this.defaultSecret('create', method),
			didDocument: this.defaultDidDocument('create', method)
		});
	}

	onClickUpdate(method, driverName) {
		this.setState({
			operation: 'update',
			method: method,
			driverName: driverName,
			jobId: null,
			identifier: null,
			options: this.defaultOptions('update', method),
			secret: this.defaultSecret('update', method),
			didDocument: this.defaultDidDocument('update', method)
		});
	}

	onClickDeactivate(method, driverName) {
		this.setState({
			operation: 'deactivate',
			method: method,
			driverName: driverName,
			jobId: null,
			identifier: null,
			options: this.defaultOptions('deactivate', method),
			secret: this.defaultSecret('deactivate', method),
			didDocument: this.defaultDidDocument('deactivate', method)
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
			method: null,
			driverName: null,
			jobId: null,
			identifier: null,
			options: null,
			secret: null,
			didDocument: null
		});
		this.props.onClear();
	}

	onChangeJobId(e) {
		this.setState({jobId: e.target.value});
	}

	onChangeIdentifier(e) {
		this.setState({identifier: e.target.value});
	}

	onChangeOptions(e) {
		this.setState({options: e.target.value});
	}

	onChangeSecret(e) {
		this.setState({secret: e.target.value});
	}

	onChangeDidDocument(e) {
		this.setState({didDocument: e.target.value});
	}

	render() {
		var jobIdInput;
		if (this.state.operation) {
			jobIdInput = (
				<Grid.Column width='10'>
					<Form onSubmit={this.onClickJobCheck.bind(this)}>
						<Form.Group inline>
							<Form.Input label='JOB&nbsp;ID:' placeholder='...'
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
		if (this.state.operation && this.state.method) {
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


		var createButtons;
		var updateButtons;
		var deactivateButtons;
		if (!this.state.operation) {
			const createButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i}
						onClick={this.onClickCreate.bind(this, driver.method, driver.name)}>{driver.name}</Button>
			);
			createButtons = (
				<Item className="buttons"><Label><label htmlFor={'createButtonsList'}>Create:</label></Label><span
					id={'createButtonsList'}>{createButtonsList}</span></Item>
			);
			const updateButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i}
						onClick={this.onClickUpdate.bind(this, driver.method, driver.name)}>{driver.name}</Button>
			);
			updateButtons = (
				<Item className="buttons"><Label><label htmlFor={'updateButtonsList'}>Update:</label></Label><span
					id={'updateButtonsList'}>{updateButtonsList}</span></Item>
			);
			const deactivateButtonsList = this.props.drivers.map((driver, i) =>
				<Button className="operationButton" primary key={i}
						onClick={this.onClickDeactivate.bind(this, driver.method, driver.name)}>{driver.name}</Button>
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

		var didDocumentInput;
		if (this.state.didDocument != null) {
			didDocumentInput = (
				<Item>
					<Item className="diddocument-label" for={'didDocumentInput'}>DID DOCUMENT:</Item>
					<TextArea id={'didDocumentInput'} className="diddocument" value={this.state.didDocument} cols='60' rows='5'
							  onChange={this.onChangeDidDocument.bind(this)}/>
				</Item>
			);
		}

		return (
			<Segment className="registrar-input">
				{executeClearButtons}
				{createButtons}
				{updateButtons}
				{deactivateButtons}
				{identifierInput}
				{optionsSecretInput}
				{didDocumentInput}
			</Segment>
		);
	}

	defaultOptions(operation, method) {
		const options = {
			'create': {
				'btcr': {'chain': 'TESTNET'},
				'sov': {'network': 'danube'},
				'v1': {'ledger': 'test', 'keytype': 'ed25519'},
				'key': {'keyType': 'Ed25519VerificationKey2018'},
				'ion': {},
				'web': {},
				'ebsi':{}
			},
			'update': {
				'btcr': {'chain': 'TESTNET'},
				'sov': {},
				'v1': {'ledger': 'test'},
				'key': {},
				'ion': {},
				'web': {},
				'ebsi':{'flag':'updateKey'}
			},
			'deactivate': {
				'btcr': {'chain': 'TESTNET'},
				'sov': {'network': 'danube'},
				'v1': {'ledger': 'test'},
				'key': {},
				'ion': {},
				'web': {},
				'ebsi':{}
			}
		};
		return options[operation][method] ? JSON.stringify(options[operation][method], null, 2) : null;
	}

	defaultSecret(operation, method) {
		const secret = {
			'create': {
				'btcr': {'privateKeyWiF': null},
				'sov': {'seed': null},
				'v1': {},
				'key': {},
				'ion': {},
				'web': {},
				'ebsi':{'token':"ey......"},
			},
			'update': {
				'btcr': {'privateKeyWiF': '...'},
				'sov': {'seed': '...'},
				'v1': {},
				'key': {},
				'ion': {},
				'web': {},
				'ebsi':{'token':"ey......",'privateKey':'..'},
			},
			'deactivate': {
				'btcr': {'privateKeyWiF': '...'},
				'sov': {'seed': '...'},
				'v1': {},
				'key': {},
				'ion': {},
				'web': {},
				'ebsi':{}
			}
		};
		return secret[operation][method] ? JSON.stringify(secret[operation][method], null, 2) : null;
	}

	defaultDidDocument(operation, method) {
	    const didDocument = {
                 "@context": "https://www.w3.org/ns/did/v1",
                 "authentication": [
                 ],
                 "service": [
                 ]
               };
       return JSON.stringify(didDocument, null, 2);
	}
}

export default RegistrarInput;
