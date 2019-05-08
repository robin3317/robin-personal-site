import React, { Component } from 'react'
import axios from 'axios'

import BaseLayout from '../components/layouts/BaseLayout'

class Portfolio extends Component {
  // Fetching data from api
  static async getInitialProps() {
    let posts = []
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      posts = response.data
    }catch(error) {
      console.error(error)
    }

    return {posts: posts.splice(0, 10)}
  }

  // Render posts as a list
  renderPosts(posts) {
    return posts.map(post => {
      return <li key={post.id}>{post.title}</li>
    })
  }

  render() {
    const { posts } = this.props;

    return(
      <BaseLayout>
        <h1>Portfolio Page</h1>
        <ul>{this.renderPosts(posts)}</ul>
      </BaseLayout>
    )
  }
}

export default Portfolio