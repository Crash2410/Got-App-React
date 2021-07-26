import React from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import ErrorMessage from '../../error/error';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';
import { Field } from '../../itemDetails';
import './booksPage.css';


export default class BooksPage extends React.Component {
    gotService = new GotService();

    state = {
        selectedItem: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


    render() {
        const { selectedItem, error } = this.state;


        if (error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name, authors }) => {
                    return `${name} (${authors})`
                }} />
        );

        const charDetails = (
            <ItemDetails
                itemId={selectedItem}
                getData={this.gotService.getBooks}
            >
                <Field field='name' label='Name' />
                <Field field='numberOfPages' label='Number Of Page' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>

        );

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}
