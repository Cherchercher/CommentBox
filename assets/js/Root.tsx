import * as React from 'react';
import { BrowserRouter, RouteComponentProps, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { ApplicationState, ConnectedReduxProps } from './store'
import { Topic } from './store/topics/types'
import Header from './components/Header';
import HomePage from './pages/index';
import AboutPage from './pages/about';

interface PropsFromState {
  loading: boolean
  data: Topic[]
  errors?: string
}

type AllProps = PropsFromState & RouteComponentProps<{}> & ConnectedReduxProps

class Root extends React.Component<AllProps> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </BrowserRouter>
    )
  }
};



// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default Root
