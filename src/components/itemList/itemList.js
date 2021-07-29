import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import './itemList.css';
import withData from '../hoc-helpers/withData';

const ItemList = ({onItemSelected, data, loading, renderItem}) => {

    const renderItems = (arr) => {
        return arr.map((item) => {
            const { id } = item;
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

    const spinner = loading ? <Spinner /> : null;
    const items = renderItems(data);

    return (
        <ul className="item-list list-group">
            {spinner}
            {items}
        </ul>
    )
}

ItemList.defaultProps = {
    onItemSelected: () => { }
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

export default withData(ItemList);