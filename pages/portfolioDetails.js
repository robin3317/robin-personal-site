import React, { Component } from 'react'
import { withRouter } from 'next/router'

import BaseLayout from '../components/layouts/BaseLayout'
import axios from 'axios'

class PortfolioDetails extends Component {

  static async getInitialProps({query}) {
    let postObj = {},
        postId = query.id

    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      postObj = response.data
    }catch (error) {
      console.error(error)
    }

    return postObj;
  }

  render() {
    const {title, id, body} = this.props

    return(
      <BaseLayout>
        <h1>PortfolioDetails Page</h1>
        <h2>{title}</h2>
        <p>ID: {id}</p>
        <p>BODY: {body}</p>
      </BaseLayout>
    )
  }
}

export default withRouter(PortfolioDetails)