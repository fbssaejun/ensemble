import { Fragment } from "react";


export default function Footer() {
  return (
    <Fragment>
    <footer>
      <div>
        <h4>Anthony Kim</h4>
        <h4>Drew Kang</h4>
        <h4>Tim Zheng</h4>
      </div>
      <div className="hello">
        <h5><a href="https://github.com/fbssaejun"><i class="fab fa-github"></i></a></h5>
        <h5><a href="https://github.com/KangerDrew"><i class="fab fa-github"></i></a></h5>
        <h5><a href="https://github.com/Tzheng456"><i class="fab fa-github"></i></a></h5>
      </div>
    </footer> 
    </Fragment>
  );
};