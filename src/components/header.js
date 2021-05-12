import React from "react";
import "./css/header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "title center " + this.props.theme,
      title: this.props.title,
    };
  }

  render() {
    return <h1 className={this.state.className}>{this.state.title}</h1>;
  }
}

export default Header;
