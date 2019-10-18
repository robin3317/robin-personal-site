import React, { Component } from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/layouts/BasePage';

class Cv extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>CV Page</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
