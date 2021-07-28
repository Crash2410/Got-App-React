import React from 'react';
import Container from 'reactstrap/lib/Container';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import './homePage.css';

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h1 className="display-3">База данных по вселенной Ice and Fire </h1>
                        <p className="lead">Эта база данных работает при помощи API of Ice And Fire. При помощи этого
                            ресурса вы сможете получить информацию об книгах, персонажах и домах.</p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}