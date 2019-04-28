import { Fragment } from 'react';

import Header from '../shared/Header';

const BaseLayout = (props) => {
  return(
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  );
}

export default BaseLayout;