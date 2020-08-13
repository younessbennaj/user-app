import * as React from 'https://cdn.skypack.dev/react@^16.13.1';
import * as ReactDOM from 'https://cdn.skypack.dev/react-dom@^16.13.1';

var x = 4;

const App = () => {
    return (
        <div>
            <h1>JSX Element</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tempore velit, ipsam hic saepe provident, aperiam inventore illo quidem excepturi, consequuntur facere numquam ad harum temporibus aut quam recusandae? Dolorum.</p>
        </div>
    )
}

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
