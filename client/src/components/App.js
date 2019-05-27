import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import WordCreate from './words/WordCreate'
import WordDelete from './words/WordDelete'
import WordEdit from './words/WordEdit'
import WordList from './words/WordList'
import WordShow from './words/WordShow'
import Header from './Header'

const App = () => {
    return (
        <BrowserRouter>
            <div className="ui container">
                <Header />
                <Route path='/' exact component= {WordList} />
                <Route path='/words/new' exact component= {WordCreate} />
                <Route path='/words/edit' exact component= {WordEdit} />
                <Route path='/words/delete' exact component= {WordDelete} />
                <Route path='/words/show' exact component= {WordShow} />
            </div>
        </BrowserRouter>
    );
    
}

export default App