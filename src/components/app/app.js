import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage';
import ErrorMessage from '../error/error';
import './app.css'
import GotService from '../../services/gotService';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';


export class App extends React.Component {
    gotService = new GotService();

    state = {
        showRandomChar: false,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState(({ showRandomChar }) => {
            return {
                showRandomChar: !showRandomChar
            }
        });
    }

    render() {
        const { showRandomChar, error } = this.state;
        const toggleRandomChar = showRandomChar ? null : <RandomChar />;

        if (error) {
            return <ErrorMessage />
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {toggleRandomChar}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            <Button onClick={this.toggleRandomChar} className='delete-random-char' color="danger">Delete</Button>
                        </Col>
                    </Row>
                    <CharacterPage />
                    <BooksPage/>
                    <HousesPage/>
                </Container>
            </>
        );
    }
};

export default App;