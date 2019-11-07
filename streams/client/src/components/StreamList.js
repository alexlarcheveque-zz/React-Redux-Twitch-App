import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../actions";
import "./StreamList.css";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdminButtons(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="content">
          <div className="ui two buttons">
            <Link
              to={`/streams/edit/${stream.id}`}
              className="ui basic button primary"
            >
              Edit
            </Link>
            <Link
              to={`/streams/delete/${stream.id}`}
              className="ui basic button negative"
            >
              Delete
            </Link>
          </div>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="four wide column">
          <div className="ui raised card fillUp" key={stream.id}>
            <div className="ui centered image">
              <img
                src={`https://api.adorable.io/avatars/${stream.id}`}
                alt="avatar"
              />
            </div>
            <div className="content">
              <Link to={`/streams/${stream.id}`} className="header">
                {stream.title}
              </Link>
              <div className="description">{stream.description} </div>
            </div>
            {this.renderAdminButtons(stream)}
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2> Streams </h2>
        <div className="ui grid">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
