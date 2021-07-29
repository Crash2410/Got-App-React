import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import './randomChar.css';

const RandomChar = ({ interval }) => {

    const gotService = new GotService();

    const [data, updateData] = useState({});
    const [loading, updateLoading] = useState(true);
    const [error, updateError] = useState(false);

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, interval);

        return () => {
            clearInterval(timerId)
        };
    }, [])

    const onDataLoaded = (data) => {
        updateData(data);
        updateLoading(false);
    }

    const onError = (err) => {
        updateError(true);
        updateLoading(false);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        gotService.getCharacters(id)
            .then(onDataLoaded)
            .catch(onError);
    }

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View data={data} /> : null;

    return (
        <div className="random-block rounded">
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

export default RandomChar;

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
