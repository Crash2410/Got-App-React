import React from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../error/error';
import GotService from '../../../services/gotService';
import { withRouter } from 'react-router-dom';
import './booksPage.css';


class BooksPage extends React.Component {
    gotService = new GotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const { error } = this.state;

        if (error) {
            return <ErrorMessage />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({ name, authors }) => {
                    return `${name} (${authors})`
                }} />
        )
    }
}

export default withRouter(BooksPage);
