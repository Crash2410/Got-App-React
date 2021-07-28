import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import './itemList.css';
export default class ItemList extends Component {

    state = {
        itemList: null,
        loading: true
    }

    componentDidMount() {
        const { getData } = this.props;
        getData()
            .then((itemList) => {
                this.setState({ itemList, loading: false });
            });

    }

    renderItems = (arr) => {
        const { onItemSelected } = this.props;
        return arr.map((item, i) => {
            const { id } = item;
            const { renderItem } = this.props;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {renderItem(item)}
                </li>
            )
        })
    }

    render() {

        const { itemList, loading } = this.state;
        if (!itemList) {
            return <Spinner />
        }
        const spinner = loading ? <Spinner /> : null;
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {spinner}
                {items}
            </ul>
        );
    }
}