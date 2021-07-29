import React, { useEffect, useState } from 'react';
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

const ItemDetails = ({ itemId, getData, children }) => {

    const [item, updateItem] = useState(null);
    const [loading, updateLoading] = useState(true);
    const [error, updateError] = useState(false);

    useEffect(() => {
        updateChar();
    }, [itemId])

    const updateChar = () => {

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                updateItem(item);
                updateLoading(false);
            })
            .catch((err) => {
                updateError(true);
            })
    }

    if (error) {
        return <div>Данный элемент не найден. Возможно он не существует.</div>
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

export default ItemDetails;

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