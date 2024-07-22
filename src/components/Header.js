import React, { useState } from 'react';
// import '../styles.css';

function Header() {
    const [activeLink, setActiveLink] = useState('home');
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setIsNavCollapsed(true); // Collapse the navbar after clicking a link
    };

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
                <h1 className="navbar-brand" style={{fontSize:"30px"}}>Monthly Task Planner</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                            <a 
                                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                                aria-current="page" 
                                href="#home" 
                                onClick={() => handleLinkClick('home')}
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className={`nav-link ${activeLink === 'addChallenge' ? 'active' : ''}`}
                                // aria-current="page" 
                                href="#addChallenge" 
                                onClick={() => handleLinkClick('addChallenge')}
                            >
                                Add a Task
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeLink === 'viewChallenges' ? 'active' : ''}`}
                            href="#viewChallenge"
                            onClick={() => handleLinkClick('viewChallenges')}
                            >
                                View all Tasks
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;