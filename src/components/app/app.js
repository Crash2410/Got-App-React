import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage';
import ErrorMessage from '../error/error';
import './app.css'
import GotService from '../../services/gotService';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';
import BooksItem from '../pages/booksPage/booksItem/booksItem';
import PageNotFound from '../pages/pageNotFound/pageNotFound';
import HomePage from '../pages/homePage/homePage';


export class App extends React.Component {
    gotService = new GotService();

    state = {
        showRandomChar: false,
        error: false,
        notFound: false
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

    pageNotFound = () => {
        this.setState({
            notFound: true
        })
    }

    render() {
        const { showRandomChar, error, notFound } = this.state;
        const toggleRandomChar = showRandomChar ? null : <RandomChar interval={2500}/>;


        if (error) {
            return <ErrorMessage />
        }

        if (notFound) {
            return (<Router>
                <PageNotFound />
            </Router>)
        }
        return (
            <Router>
                <div className='app'>
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

                        <Switch>
                            <Route exact path='/'>
                                <HomePage />
                            </Route>
                            <Route exact path='/characters/' component={CharacterPage} />
                            <Route exact path='/houses/' component={HousesPage} />
                            <Route exact path='/books/' component={BooksPage} />
                            <Route exact path='/books/:id' render={
                                ({ match }) => {
                                    const { id } = match.params;
                                    return <BooksItem bookId={id} />
                                }
                            } />

                            <Route path="*">
                                {this.pageNotFound}
                            </Route>
                        </Switch>

                    </Container>
                </div>
            </Router>
        );



    }
};

export default App;