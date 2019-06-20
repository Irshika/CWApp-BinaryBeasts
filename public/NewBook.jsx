import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './App.css';

export default class NewBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorList: []
        }

        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetch('/api/authors/authors-list', {method: 'GET'})
            .then(res => res.json())
            .then(jsonRes => {
                const options = []
                for (const auth of jsonRes) {
                    const authName = auth.firstName + " " + auth.lastName;
                    options.push(<option key={auth._id} value={authName}>{authName}</option>)
                }

                this.setState(
                    this.state.authorList = options
                )
            })
    }

    submitHandler() {
        const book = {
            name: this.refs.name.value,
            isbn: this.refs.isbn.value,
            author: this.refs.author.value,
            price: this.refs.price.value,
            year: this.refs.year.value,
            publisher: this.refs.publisher.value,
        }

        fetch('/api/books/new-book', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                alert("Book is added!");
            })
            .then(ReactDOM.render(<App/>, document.getElementById('root')))
            .catch(err => {
                alert(err);
            })
    }

    render() {
        //const {name, isbn, author, price, year, publisher} = this.state;
        return <div>
            <form onSubmit={this.submitHandler}>
                <table align="center">
                    <tbody>
                    <tr>
                        <td>
                            Book Name :
                        </td>
                        <td>
                            <input type="text" ref="name"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Author :
                        </td>
                        <td>
                            <select type="text" ref="author">
                                {this.state.authorList}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Year :
                        </td>
                        <td>
                            <input type="text" ref="year"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Publisher :
                        </td>
                        <td>
                            <input type="text" ref="publisher"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ISBN :
                        </td>
                        <td>
                            <input type="text" ref="isbn"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Price :
                        </td>
                        <td>
                            <input type="text" ref="price"/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit">Done</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    }
}