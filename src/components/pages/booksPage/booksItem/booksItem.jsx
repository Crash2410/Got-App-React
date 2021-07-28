import React from 'react';
import Button from 'reactstrap/lib/Button';
import GotService from '../../../../services/gotService';
import { Field } from '../../../itemDetails';
import ItemDetails from '../../../itemDetails';
import { Link } from 'react-router-dom';
import './booksItem.css';
import Error from '../../../error/error';


export default class BooksItem extends React.Component {
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

        if(error){
            return <Error/>
        }

        return (
            <div>
                <Link to='/books/'><Button className='prev-btn' color="info">Previous to books</Button></Link>
                <ItemDetails
                    itemId={this.props.bookId}
                    getData={this.gotService.getBooks}
                >
                    <Field field='name' label='Name' />
                    <Field field='numberOfPages' label='Number Of Page' />
                    <Field field='publisher' label='Publisher' />
                    <Field field='released' label='Released' />
                </ItemDetails>
            </div>
        )
    }
}