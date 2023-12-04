import React from 'react'
import {createRoot} from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {HelmetProvider} from "react-helmet-async";
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';


createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
        domain="dev-bxvoa2j0jsto1uun.us.auth0.com"
        clientId="pRAwprjHSEMwP3EqW3wcuT2BjJOKSrmI"
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "https://dev-bxvoa2j0jsto1uun.us.auth0.com/api/v2/",
            scope: "read:current_user update:current_user_metadata"
        }}>
        <React.StrictMode>
            <HelmetProvider>
                <App/>
            </HelmetProvider>
        </React.StrictMode>,
    </Auth0Provider>

)
