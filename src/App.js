import Switch from '@mui/material/Switch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

function App() {
  return (
    <div className="App">
      <div className="my_Nav">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{justifyContent:'space-between'}}>
          <h1 id="site-title"><a href="#" title="About this website" className="toggler">MJ Studio</a></h1>
          <div><Switch {...label} defaultChecked /></div>
        </nav>
      </div>
      <div className="container inner">
        <section id="bio" style={{textAlign: 'left'}}>
          <h1>Howdy!</h1><p>I'm <strong>Mandar Jaurat</strong> from Mumbai, India.</p>
          <p>I'm a React Developer and HTML+CSS coder working at
            <a href="https://www.fyntune.com/" title="Discover parascadd" target="_blank">Fyntune</a>.
            </p><p>I'm also a dancer.</p></section>
            <section id="projects">
              <h1 className="group-title project">Let's talk</h1>
              <ul><li className="bubble ml"><a><h2>Education</h2><p>BSC IT(2017) from Mumbai University</p></a>
              </li><li className="bubble datm"><a><h2>Work Experience</h2><p>2 year 8 months as Front End Developer</p></a>
              </li><li className="bubble gtb"><a><h2>My Passion</h2><p>Web surfing, Dancing, Reading</p></a></li>
              <li className="bubble mand"><a><h2>What i can do</h2><p>Javascript, ReactJS, NodeJS, jQuery &amp; HTML5+CSS3</p></a></li>
              </ul>
              </section>
              </div>
    </div>
  );
}

export default App;