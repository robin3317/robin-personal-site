import React, { Component } from 'react';
import auth0Client from '../services/auth0';
import { withRouter } from 'next/router';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/layouts/BasePage';

class Callback extends Component {
  componentDidMount = async () => {
    await auth0Client.handleAuthentication();
    this.props.router.push('/');
  };

  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1>Login....</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Callback);
