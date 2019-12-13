import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/layouts/BasePage';

class About extends Component {
  render() {
    console.log('About', this.props);
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>About Page</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
