import React from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import ErrorMessage from '../../error/error';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';
import { Field } from '../../itemDetails';
import './housesPage.css';


export default class HousesPage extends React.Component {
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
                getData={this.gotService.getAllHouses}
                renderItem={({ name }) => {
                    return `${name}`
                }} />
        );

        const charDetails = (
            <ItemDetails
                itemId={selectedItem}
                getData={this.gotService.getHouse}
            >
                <Field field='name' label='Name' />
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='overlord' label='Overlord' />
            </ItemDetails>

        );

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}
