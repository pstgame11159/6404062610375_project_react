import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";


import Bisection from './Root_of_Equation/Bisetion'
import Gauss_eiei from "./Linear_Algebra/Gauss_Elimination";
import CramerRule from "./Linear_Algebra/CramerRule";
import False_Position from "./Root_of_Equation/False_Position";
import Secant from "./Root_of_Equation/Secant";
import Newton from "./Root_of_Equation/Newton";
import Sidel from './Linear_Algebra/Sidel';
import Lagrange from './Interpolation/Lagrange'
import LINEAR_REGRESSION from './Interpolation/LINEAR_REGRESSION';
import POLYNOMIAL_REGRESSION from './Interpolation/POLYNOMIAL_REGRESSION'

function Navbars() {
  return (
<Router>
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant={"dark"}>
      <Container>
        <Navbar.Brand as={Link} to={"/home"}>Numerical Method</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to={"/falsepos"}>False Position</Nav.Link>
            <Nav.Link as={Link} to={"/newton"}>Newton Raphson</Nav.Link>
            <Nav.Link as={Link} to={"/secant"}>Secant Method</Nav.Link> */}
            <NavDropdown title="Root of Equation" id="basic-nav-dropdown">
              
              
              <NavDropdown.Item as={Link} to={"/bisection"}>Bisection</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/False_Position"}>False_Position</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/Newton"}>Newton</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/Secant"}>Secant</NavDropdown.Item>

            </NavDropdown>
            <NavDropdown title="Linear Algebra" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/Gauss_eiei"}>Gauss_Elimination</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/CramerRule"}>CramerRule</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/Sidel"}>Sidel</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Interpolation  " id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/Lagrange"}>Lagrange</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/LINEAR_REGRESSION"}>LINEAR_REGRESSION</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/POLYNOMIAL_REGRESSION"}>POLYNOMIAL_REGRESSION</NavDropdown.Item>
            </NavDropdown>




            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <div>
       <Routes>
          {/* <Route path="/home" element={<Home/>}></Route> */}
          <Route path="/bisection" element={<Bisection/>}></Route>
          <Route path="/False_Position" element={<False_Position/>}></Route>
          <Route path="/Newton" element={<Newton/>}></Route>
          <Route path="/Secant" element={<Secant/>}></Route>
          <Route path="/Gauss_eiei" element={<Gauss_eiei/>}></Route>
          <Route path="/CramerRule" element={<CramerRule/>}></Route>
          <Route path="/Sidel" element={<Sidel/>}></Route>
          <Route path="/Lagrange" element={<Lagrange/>}></Route>
          <Route path="/LINEAR_REGRESSION" element={<LINEAR_REGRESSION/>}></Route>
          <Route path="/POLYNOMIAL_REGRESSION" element={<POLYNOMIAL_REGRESSION/>}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default Navbars;