import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "512089834503-c946bh86059ggdjvkqicre8olqqmm76b.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="fluid ui button">
          <i className="sign-out icon"> </i> Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="fluid ui red button">
          <i className="google icon"> </i> Sign In w/ Google!
        </button>
      );
    }
  }

  render() {
    return <div> {this.renderAuthButton()} </div>;
  }
}

export default GoogleAuth;
