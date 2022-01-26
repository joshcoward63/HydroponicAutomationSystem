// import * as React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to React Router!</h1>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/About" element={<About />} />
//       </Routes>
//     </div>
//   );
// }
// function Home() {
//   return (
//     <>
//       <main>
//         <h2>Welcome to the homepage!</h2>
//         <p>You can do this, I believe in you.</p>
//       </main>
//       <nav>
//         <Link to="/about">About</Link>
//       </nav>
//     </>
//   );
// }

// function About() {
//   return (
//     <>
//       <main>
//         <h2>Who are we?</h2>
//         <p>
//           That feels like an existential question, don't you
//           think?
//         </p>
//       </main>
//       <nav>
//         <Link to="/">Home</Link>
//       </nav>
//     </>
//   );
// }
// export default App;
// // import React, { Component } from 'react';
// // import { BrowserRouter as Router, Route } from 'react-router-dom';
// // import { Home } from './Home';
// // import { About } from './About';
// // // import { Contact } from './Contact';
// // import { NoMatch } from './NoMatch';
// // import { Layout } from './components/Layout';
// // import { NavigationBar } from './components/NavigationBar';

// // class App extends Component {
// //   render() {
// //     return (
// //       <React.Fragment>
// //         <Router>
// //           <NavigationBar />
// //           {/* <Jumbotron /> */}
// //           <Layout>
// //             {/* <Switch> */}
// //               <Route exact path="/" component={Home} />
// //               <Route path="/about" component={About} />
// //               {/* <Route path="/contact" component={Contact} /> */}
// //               <Route component={NoMatch} />
// //             {/* </Switch> */}
// //           </Layout>
// //         </Router>
// //       </React.Fragment>
// //     );
// //   }
// // }

// // export default App;
import React from 'react';
import './App.css';
import Navbar from './components/Navbar1';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Records from './pages/records';
import Program from './pages/program';
import DeviceManager from './pages/deviceManager';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/program' element={<Program/>} />
        <Route path='/records' element={<Records/>} />
        <Route path='/device-manager' element={<DeviceManager/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;