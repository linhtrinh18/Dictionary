import React from 'react';
import { Router, Route} from 'react-router-dom';
import WordCreate from './words/WordCreate';
import WordDelete from './words/WordDelete';
import WordEdit from './words/WordEdit';
import WordList from './words/WordList';
import WordShow from './words/WordShow';
import Header from './Header';
import FrontPage from './words/FrontPage';

import history from '../history';

const App = () => {
    return (
        <Router history={history}>
            <div>
                <Header />
                <Route path='/' exact component= {WordList} />
                <Route path='/me' exact component = {FrontPage} />
                <Route path='/words/new' exact component= {WordCreate} />
                <Route path='/words/edit/:id' exact component= {WordEdit} />
                <Route path='/words/delete' exact component= {WordDelete} />
                <Route path='/words/show' exact component= {WordShow} />
            </div>
        </Router>
    );
    
};

export default App;