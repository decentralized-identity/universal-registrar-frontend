import React, { Component } from 'react';

import { Segment, Tab, Divider } from 'semantic-ui-react'

import Driver from './Driver';
import RegistrarInput from './RegistrarInput';
import Error from './Error';
import DidResult from './result/DidResult';
import DidState from './result/DidState';
import DidRegistrationMetadata from './result/DidRegistrationMetadata';
import DidDocumentMetadata from './result/DidDocumentMetadata';

export class Registrar extends Component {

	constructor (props) {
		super(props);
		this.state = { loading: false, didState: null, jobId: null, didRegistrationMetadata: null, didDocumentMetadata: null, error: null };
	}

	render() {
		const drivers = this.props.drivers.map((driver, i) =>
			<Driver key={i} name={driver.name} />
		);

		var resultOrError;
		if (this.state.error) resultOrError = (
			<Error text={this.state.error} />
			);
		else if (this.state.didState) resultOrError = (
			<DidResult
				didState={this.state.didState}
				jobId={this.state.jobId}
				didRegistrationMetadata={this.state.didRegistrationMetadata}
				didDocumentMetadata={this.state.didDocumentMetadata} />
			);

		return (
			<Segment className="registrar">
				<RegistrarInput
					drivers={this.props.drivers}
					onClear={this.onClear.bind(this)}
					onLoading={this.onLoading.bind(this)}
					onResult={this.onResult.bind(this)}
					onError={this.onError.bind(this)} />
				<Divider />
				<Tab panes={[
					{ menuItem: 'RESULT', render: () =>
					<Tab.Pane loading={this.state.loading}>
						{resultOrError}
					</Tab.Pane> },
					{ menuItem: 'DID STATE', render: () =>
					<Tab.Pane loading={this.state.loading}>
						<DidState
							didState={this.state.didState} />
					</Tab.Pane> },
					{ menuItem: 'REGISTRAR METADATA', render: () =>
					<Tab.Pane loading={this.state.loading}>
						<DidRegistrationMetadata
							didRegistrationMetadata={this.state.didRegistrationMetadata} />
					</Tab.Pane> },
					{ menuItem: 'METHOD METADATA', render: () =>
					<Tab.Pane loading={this.state.loading}>
						<DidDocumentMetadata
							didDocumentMetadata={this.state.didDocumentMetadata} />
					</Tab.Pane> }
				]} />
			</Segment>
		);
	}

	onClear() {
		this.setState({ loading: false, didState: null, jobId: null, didRegistrationMetadata: null, didDocumentMetadata: null, error: null });
	}

	onLoading() {
		this.setState({ loading: true, didState: null, jobId: null, didRegistrationMetadata: null, didDocumentMetadata: null, error: null });
	}

	onResult(didState, jobId, didRegistrationMetadata, didDocumentMetadata) {
		this.setState({ loading: false, didState: didState, jobId: jobId, didRegistrationMetadata: didRegistrationMetadata, didDocumentMetadata: didDocumentMetadata, error: null });
	}

	onError(error, didState, jobId, didRegistrationMetadata, didDocumentMetadata) {
		this.setState({ loading: false, didState: didState, jobId: jobId, didRegistrationMetadata: didRegistrationMetadata, didDocumentMetadata: didDocumentMetadata, error: error });
	}
}

export default Registrar;
