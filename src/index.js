import React, { useState, useEffect } from 'https://cdn.skypack.dev/react@^16.13.1';
import * as ReactDOM from 'https://cdn.skypack.dev/react-dom@^16.13.1';

/*/

    Local State or Not ?

        users list => no (passed from the props)

        filtered list => no (caculate from the original list with the search text)

        search text => yes (change by the time)

/*/

//This component is the parent component of our app
//Receive the data model as props
const FilterableUserTable = ({ users }) => {
    const [searchText, setSearchText] = useState('')

    return (
        <>
            <SearchInput searchText={searchText} setSearchText={setSearchText} />
            <UserTable users={users} searchText={searchText} />
        </>
    )
}


//Gets the data entered by the user
const SearchInput = ({ searchText, setSearchText }) => {

    const handleChange = e => {
        setSearchText(e.target.value);
    }

    return (
        <form>
            <input value={searchText} onChange={handleChange} placeholder="Search Username..." type="text" id="search" />
        </form>
    )
}

/**
   * Renders a <UserTable /> component in charge of display and filter the data collection based on the search text data
   * @param {Object}  props 
   * @param {Object[]}  props.users - the users data collection to display
   * @param  {string} props.searchText - the text used to filter the data collection
   * @return a <UserTable /> component
   */

const UserTable = ({ users, searchText }) => {

    //Return a user data collection with the searched user name
    const filteredUsers = users.filter(user => {
        return user.username.slice(0, searchText.length).toLowerCase() === searchText.toLowerCase();
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map(user => {
                    return (
                        <UserRow user={user} />
                    )
                })}
            </tbody>
        </table>
    )
}

//Diplay users information on a row
const UserRow = ({ user: { name, username, email } }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
        </tr>
    )
}

const App = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        //React guarantees that this code will be executed when the DOM is rendered 

        //fetch() return a promise object
        const promise = fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' });

        promise
            .then(function (res) {
                return res.json(); //if we return a promise, we can use promise chaining
            })
            .then(function (data) {
                setUsers(data);
            })

    }, [])//no dependencies => no need to call this function more than one time.

    return (
        <FilterableUserTable users={users} />
    )
}

//Get our root element DOM reference (as DOM Element() object)
const root = document.getElementById("root");

const date = new Date();

//Render our App component inside the root element of the document
ReactDOM.render(<App date={date.toString()} />, root);
