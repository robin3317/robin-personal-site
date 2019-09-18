import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';

const BsNavLink = props => {
  const { route, title } = props;

  return(
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
}

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="port-navbar port-default absolute" color="transparent" light expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">
            Abdur Rahman Robin
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <NavItem className="port-navbar-item">
                <BsNavLink route="/" title='Home' />
              </NavItem>

              <NavItem className="port-navbar-item">
                <BsNavLink route="/about" title="About" />
              </NavItem>

              <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolio" title="Portfolio" />
              </NavItem>

              <NavItem className="port-navbar-item">
                <BsNavLink route="/blog" title="Blog" />
              </NavItem>

              <NavItem className="port-navbar-item">
                <BsNavLink route="/cv" title="CV" />
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;