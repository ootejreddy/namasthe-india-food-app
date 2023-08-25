import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { name: "dummy" },
    };
  }
  async componentDidMount() {
    const userData = await fetch("https://api.github.com/users/ootejreddy");
    const json = await userData.json();
    // console.log(json);
    this.setState({
      userInfo: json,
    });
  }
  render() {
    const { login, avatar_url } = this.state.userInfo;
    return (
      <div>
        <h1>name: {login} </h1>
        <img src={avatar_url}></img>
      </div>
    );
  }
}

export default UserClass;
