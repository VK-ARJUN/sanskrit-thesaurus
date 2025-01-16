import React from 'react';
import { Link } from 'react-router-dom';

function ViewHome() {
    return (
        <div>
            <Link to="/view/verb">
                <button>Verb</button>
            </Link>
            <Link to="/view/lookup">
                <button>Lookup</button>
            </Link>
        </div>
    );
}

export default ViewHome;
