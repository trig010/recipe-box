import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import history from './history';
import { Switch } from 'react-router';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import store from './store';
import App from './components/App';
import Splash from './components/Splash';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

const Main = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter history={history}>
                <Switch>
                    <Route exact path="/" component={Splash} />
                    <Route path="/main" component={App} />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
