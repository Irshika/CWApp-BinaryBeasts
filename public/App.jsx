'use strict'

import React, {Component} from 'react';

import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            selectedBook: [],
            checked: true
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.checkPrice = this.checkPrice.bind(this);
    }

    changeHandler(e) {
        e.preventDefault();

        const temp = this.state.selectedBook;
        temp.push(e.target.name);

        this.setState(this.state.selectedBook = temp);
    }

    checkPrice() {
        const books = [];
        var i;
        for (i = 0; i < this.state.selectedBook.length; i++) {
            const b = {
                "_id": this.state.selectedBook[i]
            }
            books.push(b);
        }

        fetch('http://localhost:8080/api/books/get-price', {
            method: 'POST', body: JSON.stringify(books),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res =>
                res.json()
            ).then(jsonRes => alert("Total price : LKR"+jsonRes.price))
            .catch(err => console.log(err));
    }

    componentDidMount() {

        fetch('/api/books/all-books', {method: 'GET'})
            .then(res => res.json())
            .then(jsonRes => {
                const booksT = [];

                for (const bk of jsonRes) {
                    booksT.push(
                        <tr key={bk._id}>
                            <td>
                                {bk.name}
                            </td>
                            <td>
                                {bk.author}
                            </td>
                            <td>
                                {bk.year}
                            </td>
                            <td>
                                {bk.ISBN}
                            </td>
                            <td>
                                {bk.price}
                            </td>
                            <td>
                                {bk.publisher}
                            </td>
                            <td>
                                <input type="checkbox" name={bk._id} onChange={this.changeHandler}/>
                            </td>
                        </tr>)
                }
                this.setState(
                    this.state.books = booksT
                )
            })
            .catch(err => {
                console.log(err);
            })

    }

    render() {
        return (
            <div>
                <table align="center">
                    <tbody>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>ISBN</th>
                        <th>Price</th>
                        <th>Publisher</th>
                    </tr>
                    {this.state.books}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button onClick={this.checkPrice}>Check</button>
                        </td>
                    </tr>
                    </tbody>
                </table>


            </div>
        );
    }
}