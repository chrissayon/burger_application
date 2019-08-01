import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';


///Global error handler
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        
        componentDidMount () {
            //Error shows if something went wrong
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })

            //Clear error if ou get a response
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
        
            });
        }
        
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
        
            });
        }

        componentWillUnmount() {
            //console.log('Will Unmount', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render () {
            return (   
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    } 



}

export default withErrorHandler;