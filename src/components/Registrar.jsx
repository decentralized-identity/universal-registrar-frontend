import React, { Component } from 'react';

import { Segment, Tab, Divider } from 'semantic-ui-react'

import Driver from './Driver';
import RegistrarInput from './RegistrarInput';
import Error from './Error';
import DidResult from './result/DidResult';
import DidDocument from './result/DidDocument';
import RegistrarMetadata from './result/RegistrarMetadata';
import MethodMetadata from './result/MethodMetadata';

export class Registrar extends Component {

	constructor (props) {
		super(props);
		this.state = { loading: false, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: '' };
	}

    render() {
		const drivers = this.props.drivers.map((driver, i) =>
			<Driver key={i} name={driver.name} />
		);

    	var resultOrError;
    	if (this.state.error) resultOrError = (
    		<Error text={this.state.error} />
    		);
    	if (this.state.didReference && this.state.didDocument) resultOrError = (
            <DidResult
            	didReference={this.state.didReference}
            	didDocument={this.state.didDocument}
				registrarMetadata={this.state.registrarMetadata}
            	error={this.state.error} />
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
					{ menuItem: 'DID DOCUMENT', render: () =>
					<Tab.Pane loading={this.state.loading}>
		                <DidDocument
		                	didDocument={this.state.didDocument} />
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
	this.setState({ loading: false, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: '' });
	}

	onLoading() {
	this.setState({ loading: true, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: '' });
	}

    onResult(didReference, didDocument, registrarMetadata, methodMetadata) {
	this.setState({ loading: false, didReference: didReference, didDocument: didDocument, registrarMetadata: registrarMetadata, methodMetadata: methodMetadata, error: '' });
	}

    onError(error) {
	this.setState({ loading: false, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: error });
	}
}

export default Registrar;
