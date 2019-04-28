import { Fragment } from 'react';

import Header from '../shared/Header';
import '../../styles/main.scss';

const BaseLayout = (props) => {
  return(
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  );
}

export default BaseLayout;