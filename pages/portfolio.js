import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '../routes';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/layouts/BasePage';

class Portfolio extends Component {
  // Fetching data from api
  static async getInitialProps() {
    let posts = [];
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      posts = response.data;
    } catch (error) {
      console.error(error);
    }

    return { posts: posts.splice(0, 10) };
  }

  // Render posts as a list
  renderPosts(posts) {
    return posts.map(post => {
      return (
        <li key={post.id}>
          <Link route={`/portfolioDetails/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>Portfolio Page</h1>
          <ul>{this.renderPosts(posts)}</ul>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolio;
