import React, { Component } from 'react';

import { Item, Input, Button, Dropdown } from 'semantic-ui-react'

export class AddPublicKey extends Component {

	constructor (props) {
		super(props)
		this.state = { input: '', example: '' };
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	onClickAdd() {
		//this.setState({ operation: 'create', method: method, jobId: null, options: JSON.stringify(this.defaultOptions(method), null, 2) });
	}

	onChangeExample(e, data) {
		this.setState({ example: data.value });
	}

	onChangeInput(e) {
		this.setState({ input: e.target.value });
	}

//				<Dropdown placeholder='PUBLIC KEY:' selection options={examples} value={this.state.example} onChange={this.onChangeExample.bind(this)} />

	render() {
		const examples = ['EcdsaSecp256k1VerificationKey2019', 'SchnorrSecp256k1VerificationKey2019', 'Ed25519VerificationKey2018', 'Ed25519VerificationKey2020', 'Bls12381G1Key2020', 'Bls12381G2Key2020'].map((example) => ({ text: example, value: example }));
		return (
			<table className="add-publickey">
				<tbody>
					<tr>
						<td>
							<Item className="publickey-label">PUBLIC KEY:</Item>
							<Input label='publicKey' value={this.state.input} onChange={this.onChangeInput} />
							<Button primary onClick={this.onClickAdd.bind(this)}>Add</Button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default AddPublicKey;
