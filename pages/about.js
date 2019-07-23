import React, { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/layouts/BasePage'

class About extends Component {
  render() {
    return(
      <BaseLayout>
        <BasePage>
          <h1>About Page</h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default About