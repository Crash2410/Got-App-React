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
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
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
            .catch((err) => {
                this.setState({
                    error: true
                })
            })
    }

    render() {

        const { item, loading, error } = this.state;
        const { children } = this.props;

        if (error) {
            return  <div>Данный элемент не найден. Возможно он не существует.</div>
        }

        if (!item) {
            return <span className='select-error'>Please select an item from the list.</span>
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