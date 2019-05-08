import React, { Component } from 'react'
import { withRouter } from 'next/router';

import BaseLayout from '../components/layouts/BaseLayout'

class PortfolioDetails extends Component {
  render() {
    const { title } = this.props.router.query

    return(
      <BaseLayout>
        <h1>PortfolioDetails Page</h1>
        <h2>{title}</h2>
      </BaseLayout>
    )
  }
}

export default withRouter(PortfolioDetails)