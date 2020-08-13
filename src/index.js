import * as React from 'https://cdn.skypack.dev/react@^16.13.1';
import * as ReactDOM from 'https://cdn.skypack.dev/react-dom@^16.13.1';

//Our 
const App = (props) => {
    return (
        <React.Fragment>
            <h1>My first component</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tempore velit, ipsam hic saepe provident, aperiam inventore illo quidem excepturi, consequuntur facere numquam ad harum temporibus aut quam recusandae? Dolorum.</p>
            <p>{props.date}</p>
        </React.Fragment>
    )
}

//Get our root element DOM reference (as DOM Element() object)
const root = document.getElementById("root");

const date = new Date();

//Render our App component inside the root element of the document
ReactDOM.render(<App date={date.toString()} />, root);
