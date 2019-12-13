import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/layouts/BasePage';
import withAuth from '../components/hoc/withAuth';
import axios from 'axios';
import { getSecretData } from '../actions';

class Secret extends React.Component {
  static getInitialProps = () => {
    const superSecretValue = 'Super Secret Value';
    return { superSecretValue };
  };

  state = {
    secretData: []
  };

  componentDidMount = async () => {
    const secretData = await getSecretData();

    this.setState({
      secretData
    });
  };

  displaySecretData = () => {
    const { secretData } = this.state;

    if (secretData && secretData.length > 0) {
      return secretData.map((data, index) => {
        return (
          <div key={index}>
            <p>{data.title}</p>
            <p>{data.description}</p>
          </div>
        );
      });
    }
  };

  render() {
    const { superSecretValue } = this.props;
    console.log(this.props);
    console.log(this.state);

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>Secret Page</h1>
          <h2>{superSecretValue}</h2>
          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);
