import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import './itemList.css';
import withData from '../hoc-helpers/withData';
class ItemList extends Component {

    renderItems = (arr) => {
        const { onItemSelected } = this.props;
        return arr.map((item) => {
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
        const { data, loading } = this.props
        const spinner = loading ? <Spinner /> : null;
        const items = this.renderItems(data);

        return (
            <ul className="item-list list-group">
                {spinner}
                {items}
            </ul>
        );
    }
}

export default withData(ItemList);