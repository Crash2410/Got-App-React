import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import './itemDetails.css';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export { Field };

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { itemId, getData } = this.props;

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({ item, loading: false })
            })
    }

    render() {

        const { item, loading } = this.state;
        const { children } = this.props;

        if (!item) {
            return <span className='select-error'>Please selected a character</span>
        }

        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <CharItem item={item} children={children} /> : null;

        return (
            <div className="char-details rounded">
                {spinner}
                {content}
            </div>
        );
    }
}

const CharItem = ({ item, children }) => {
    const { name } = item;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, { item })
                    })
                }
            </ul>
        </>
    )
}