import React, { Component } from 'react'
import axios from 'axios'

import BaseLayout from '../components/layouts/BaseLayout'
import { Container, Row, Col } from 'reactstrap'

class Index extends Component {
  static async getInitialProps() {
    let userData = {}
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      userData = response.data
    }catch(error) {
      console.error(error)
    }

    return {userData}
  }

  render() {
    const {userData} = this.props;

    return(
      <BaseLayout className="cover">
        <div className="main-section">
          <Container>
            <Row>
              <Col md="5">
                <div className="hero-section">
                  <div className="center">
                    <img className="image" src="../static/images/avatar.png"/>
                  </div>
                  <div className="center">
                    <h2 className="hero-section__title">Full Stack Developer</h2>
                    <p className="hero-section__subtitle">Love to convert thoughts into code!</p>
                  </div>
                </div>
              </Col>

              <Col md="7" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Abdur Rahman Robin.
                    Get informed, collaborate and discover projects I was working on through the years!
                  </h1>
                </div>

                <div className="hero-welcome-bio">
                  <h1>
                    Let's take a look on my work.
                  </h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Index