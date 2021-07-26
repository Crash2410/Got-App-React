import React from 'react';
import ItemList from '../../itemList';
import ItemDetails from '../../itemDetails';
import ErrorMessage from '../../error/error';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';
import { Field } from '../../itemDetails';
export default class CharacterPage extends React.Component {
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
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => {
                    return `${name} (${gender})`
                }} />
        );

        const charDetails = (
            <ItemDetails
                itemId={selectedItem}
                getData={this.gotService.getCharacters}
            >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>

        );

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}
