import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../layouts/BasePage';

export default function withAuth(Component) {
  return class withAuth extends React.Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));
      return { ...pageProps };
    }

    renderProtectedPage = () => {
      const { isAuthenticated } = this.props.auth;

      if (true) {
        return <Component {...this.props.auth} />;
      } else {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              <h1>
                You are not authenticated. Please Login to access this page
              </h1>
            </BasePage>
          </BaseLayout>
        );
      }
    };

    render() {
      return this.renderProtectedPage();
    }
  };
}
