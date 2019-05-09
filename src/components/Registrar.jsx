import React, { Component } from 'react';

import { Segment, Tab, Divider } from 'semantic-ui-react'

import Driver from './Driver';
import RegistrarInput from './RegistrarInput';
import Error from './Error';
import DidResult from './result/DidResult';
import DidState from './result/DidState';
import RegistrarMetadata from './result/RegistrarMetadata';
import MethodMetadata from './result/MethodMetadata';

export class Registrar extends Component {

	constructor (props) {
		super(props);
		this.state = { loading: false, didState: '', jobId: '', registrarMetadata: '', methodMetadata: '', error: '' };
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
				registrarMetadata={this.state.registrarMetadata} />
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
						<RegistrarMetadata
							registrarMetadata={this.state.registrarMetadata} />
					</Tab.Pane> },
					{ menuItem: 'METHOD METADATA', render: () =>
					<Tab.Pane loading={this.state.loading}>
						<MethodMetadata
							methodMetadata={this.state.methodMetadata} />
					</Tab.Pane> }
				]} />
			</Segment>
		);
	}

	onClear() {
		this.setState({ loading: false, didState: '', jobId: '', registrarMetadata: '', methodMetadata: '', error: '' });
	}

	onLoading() {
		this.setState({ loading: true, didState: '', jobId: '', registrarMetadata: '', methodMetadata: '', error: '' });
	}

	onResult(didState, jobId, registrarMetadata, methodMetadata) {
		this.setState({ loading: false, didState: didState, jobId: jobId, registrarMetadata: registrarMetadata, methodMetadata: methodMetadata, error: '' });
	}

	onError(error) {
		this.setState({ loading: false, didState: '', jobId: '', registrarMetadata: '', methodMetadata: '', error: error });
	}
}

export default Registrar;
