import React, { Component } from "react";

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

class Blog extends Component {
  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1>Blog Page</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Blog;
