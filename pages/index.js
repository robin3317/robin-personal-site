import React, { Component } from 'react'
import axios from 'axios'

import BaseLayout from '../components/layouts/BaseLayout'

class Index extends Component {
  static async getInitialProps() {
    let userData = {}
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      userData = response.data
    }catch(error) {
      console.error(error)
    }

    return {initialData: [1, 2, 3], userData}
  }

  state = {
    title: 'I am index page'
  }

  render() {
    const {userData} = this.props;

    return(
      <BaseLayout>
        <h1>Index Page</h1>
        <h2>{userData.title}</h2>
      </BaseLayout>
    );
  }
}

export default Index