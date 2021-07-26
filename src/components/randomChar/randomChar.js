import React, { Component } from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import './randomChar.css';

export default class RandomChar extends Component {

    gotService = new GotService();

    state = {
        data: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onDataLoaded = (data) => {
        this.setState({ data, loading: false });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacters(id)
            .then(this.onDataLoaded)
            .catch(this.onError);
    }

    render() {

        const { data, loading, error } = this.state;

        const errorMessage = error ? <Error /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View data={data} /> : null;

        return (
            <div className="random-block rounded">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}

const View = ({ data }) => {

    const { name, gender, born, died, culture } = data;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
