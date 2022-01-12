import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

import Form from "./pages/Form";
import Home from "./pages/Home";
import Post from "./pages/Post";
import SignupComponent from "./pages/newForm";
import SignupComponent2 from "./pages/newformmodel";

const App = () => {
  return (
    <Router>
      <div className="App">
    <header className="App-header" >
    <Navbar bg="dark" variant="dark">
			<Container>
			<Navbar.Brand>
				<Link to={"/"}
				className="nav-link">
				Student Management App
				</Link>
			</Navbar.Brand>

      <Nav className="justify-content-end">
				<Nav>
				<Link to={"/form"}
					className="nav-link">
					Create Student
				</Link>
				</Nav>

        <Nav>
				<Link to={"/"}
					className="nav-link">
					Student List
				</Link>
				</Nav>

				<Nav>
				<Link to={"/newform"}
					className="nav-link">
					New Form
				</Link>
				</Nav>

				<Nav>
				<Link to={"/newformmodel"}
					className="nav-link">
					New Form model
				</Link>
				</Nav>

        

			</Nav>
      </Container>
      </Navbar>
      </header>
      <Routes>
        <Route exact path="/form" element={<Form/>} />
        <Route exact path="/" element={<Home/>} />
        <Route path="/post/:_id" element={<Post/>} />
		<Route path="/newform" element={<SignupComponent/>} />
	    <Route path="/newformmodel" element={<SignupComponent2/>} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;