import React, { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import '../styles/about.scss';

class About extends Component {
  render() {
    return(
      <BaseLayout>
        <h1 className="title">About Page</h1>
      </BaseLayout>
    )
  }
}

export default About