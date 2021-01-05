import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import { HashRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'; 
require('spatial-navigation-js')
// import SpatialNavigation from 'react-js-spatial-navigation'

SpatialNavigation.init();

// Define navigable elements (anchors and elements with "focusable" class).
SpatialNavigation.add({
  selector: '.focusable'
});

// Make the *currently existing* navigable elements focusable.
SpatialNavigation.makeFocusable();

// Focus the first navigable element.
SpatialNavigation.focus();

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            
                <CookiesProvider>
                    <App/>
                </CookiesProvider>
           
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('app-mount')
); 