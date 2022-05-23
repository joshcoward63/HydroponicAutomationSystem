import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/program">Program</Link>
    </li>
    <li>
      <Link to="/records">Records</Link>
    </li>
  </div>
  );
}
export default navbar;