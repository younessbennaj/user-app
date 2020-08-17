import React, { useState, useEffect, createContext } from 'https://cdn.skypack.dev/react@^16.13.1';
import * as ReactDOM from 'https://cdn.skypack.dev/react-dom@^16.13.1';
import styled from 'https://cdn.skypack.dev/styled-components@^5.1.1';

/*/

    Local State or Not ?

        users list => no (passed from the props)

        filtered list => no (caculate from the original list with the search text)

        search text => yes (change by the time)

/*/

//Container of our App - style
const StyledContainer = styled.main`
    width: 50vw;
    margin: 2em auto;
    padding: 1em;
    background-color: #fff;
    border-radius: 3px;
    -webkit-box-shadow: 11px 12px 35px -21px rgba(0,0,0,0.54);
    -moz-box-shadow: 11px 12px 35px -21px rgba(0,0,0,0.54);
    box-shadow: 11px 12px 35px -21px rgba(0,0,0,0.54);

    @media screen and (max-width: 700px) {
        box-sizing: border-box;
        width: 100vw;
    }
`

//This component is the parent component of our app
//Receive the data model as props
const FilterableUserTable = ({ users }) => {
    const [searchText, setSearchText] = useState('')

    return (
        <StyledContainer>
            <SearchInput searchText={searchText} setSearchText={setSearchText} />
            <UserTable users={users} searchText={searchText} />
        </StyledContainer>
    )
}

const StyledInput = styled.input`
            border: 1px solid darkgray;
            height: 3em;
            margin-top: 1em;
            margin-bottom: 1em;
            padding-left: 1em;
            border-radius: 3px;
            width: 100%;
            box-sizing: border-box;
        `

//Gets the data entered by the user
const SearchInput = ({ searchText, setSearchText }) => {

    const handleChange = e => {
        setSearchText(e.target.value);
    }

    return (
        <form>
            <StyledInput value={searchText} onChange={handleChange} placeholder="Search Username..." type="text" id="search" />
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

const StyledTable = styled.table`
    width: 100%;
    border: 1px solid lightgrey;
    caption-side: bottom;
    table-layout: auto;
    border-collapse: collapse;

    thead {
        background-color: lightgray;
    }

    tbody tr:nth-child(even){
        background-color: #f2f2f2;
    }

    th {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    td {
        padding-left: 0.5em;
        padding-top: 0.3em;
        padding-bottom: 0.3em;
    }

    th, td {
        border: 1px solid darkgrey;
        height: 1.5em;
        vertical-align: middle;
    }

    caption {
        padding-top: 1em;
        padding-bottom: 1em;
        font-style: italic;
        color: darkgray;
    }

    @media screen and (max-width: 900px) {
        box-sizing: border-box;
        table-layout: fixed;

        th, td {
            overflow-wrap: break-word;
        }
    }

    @media screen and (max-width: 700px) {
        font-size: small;

    }

`;

const UserTable = ({ users, searchText }) => {

    //Return a user data collection with the searched user name
    const filteredUsers = users.filter(user => {
        return user.username.slice(0, searchText.length).toLowerCase() === searchText.toLowerCase();
    })

    return (
        <StyledTable>
            <caption>Users list</caption>
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
        </StyledTable>
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

//Switch button style here
const SwitchButton = styled.button``;

/**
* Renders a <Navbar /> component to display title app and switch button to change the UI theme
* @param {Object}  props
* @param {}  props.prop - description of the prop here
* @return a <Navbar /> component
    */

const Navbar = ({ currentTheme, setCurrentTheme }) => {


    const handleClick = () => {
        currentTheme === 'light' ? setCurrentTheme('dark') : setCurrentTheme('light');
    }

    return (
        <header>
            <h2>User Table</h2>
            <SwitchButton onClick={handleClick} >{currentTheme}</SwitchButton>
        </header>
    )
}



const App = (props) => {

    //Local state here...
    const [users, setUsers] = useState([]);
    const [currentTheme, setCurrentTheme] = useState('light');

    //Side effect code here...
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

    //Context creation to share "global" data through the components tree 

    // We create a context for the current theme (with "light" as the default).
    const ThemeContext = createContext(currentTheme);

    return (
        <>
            <Navbar currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
            <FilterableUserTable users={users} />
        </>
    )
}

//Get our root element DOM reference (as DOM Element() object)
const root = document.getElementById("root");

const date = new Date();

//Render our App component inside the root element of the document
ReactDOM.render(<App date={date.toString()} />, root);
