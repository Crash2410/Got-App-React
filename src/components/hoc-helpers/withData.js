import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            loading: true
        }

        static defaultProps = {
            onItemSelected: () => { }
        }

        static propTypes = {
            onItemSelected: PropTypes.func
        }

        componentDidMount() {
            const { getData } = this.props;
            
            getData()
                .then((data) => {
                    this.setState({ data, loading: false });
                });

        }

        render() {
            const { data, loading } = this.state;
            if (!data) {
                return <Spinner />
            }
            return (
                <View {...this.props} data={data} loading={loading} />
            )
        }
    }
}

export default withData;