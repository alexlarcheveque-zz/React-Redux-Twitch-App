import React from "react";
import { Router, Route } from "react-router-dom";
import Header from "./Header";
import StreamCreate from "./StreamCreate";
import StreamDelete from "./StreamDelete";
import StreamEdit from "./StreamEdit";
import StreamList from "./StreamList";
import StreamShow from "./StreamShow";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </Router>
    </div>
  );
};

export default App;
