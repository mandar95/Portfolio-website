import React, { useEffect, useState } from 'react';

import Switch from '@mui/material/Switch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

function App() {
  const [isTrue, setTrue] = useState(true)
  useEffect(() => {
if(isTrue){
  document.body.style.backgroundColor='#3e4049'
}else{
  document.body.style.backgroundColor='#fff'
}
  }, [isTrue])

  const handleChange=()=>{
    setTrue(!isTrue)
  }

  return (
    <div className="App">
      <div className="my_Nav">
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ justifyContent: 'space-between', padding: '0.5rem 1rem',
        // color:isTrue ?'#fff':'#343a40', backgroundColor:isTrue ?'#343a40':'#fff'
      }}
        >
          <h1 id="site-title"><a href="#" title="About this website" className="toggler">MJ Studio</a></h1>
          <div><Switch {...label} checked={isTrue}
            onChange={handleChange} /></div>
        </nav>
      </div>
      <div className="container inner">
        <section id="bio" style={{ textAlign: 'left' }}>
          <h1>Howdy!</h1><p>I'm <strong>Mandar Jaurat</strong> from Mumbai, India.</p>
          <p>I'm a Software engineer working at
            <a href="https://hexaware.com/" target="_blank">Hexaware Technology</a>.
          </p></section>
        <section id="projects">
          <h1 className="group-title project" style={{color:isTrue ?'#fff':'#343a40'}}>Let's talk</h1>
          <ul><li className="bubble ml"><a><h2>Education</h2><p>BSC IT(2017) from Mumbai University</p></a>
          </li><li className="bubble datm"><a><h2>Work Experience</h2><p>5 year as Application Frontend Developer</p></a>
            </li><li className="bubble gtb"><a><h2>My Passion</h2><p>Web surfing, Dancing, Reading</p></a></li>
            <li className="bubble mand"><a><h2>What i can do</h2><p>Javascript, Typescript, ReactJS, React Native, NodeJS, &amp; HTML5+CSS3</p></a></li>
          </ul>
        </section>
        <section id="connect" style={{ textAlign: 'left' }}>
          <h1 className="group-title connect" style={{color:isTrue ?'#fff':'#343a40'}}>Let's Connect</h1>
          <ul>
            <li className="bubble linkedin"><a href="https://www.linkedin.com/in/mandar-jaurat-b2903014b" title="Visit my LinkedIn profile" target="_blank"><h2>linkedIn</h2><p>career networking, building, &amp; sharing</p></a></li>
            <li className="bubble instagram"><a href="https://www.instagram.com/mandarjaurat/" title="Visit my Instagram profile" target="_blank"><h2>Instagram</h2><p>Posters, blogs &amp; pics</p></a></li>
            <li className="bubble email"><a href="mailto:mandarjaurat@gmail.com" title="Get in touch by email"><h2>Mail</h2><p>mandarjaurat@gmail.com</p></a></li>
            <li className="bubble whatsapp"><a href="https://wa.me/919503508525/" title="Visit my Twitter profile" target="_blank"><h2>WhatsApp</h2><p>Blah!</p></a></li>
            <li className="bubble github"><a href="https://github.com/mandar95" title="Visit my GitHub profile" target="_blank"><h2>GitHub</h2><p>The code.</p></a></li>
          </ul>
        </section>
        <figure id="rm-illu"><div className="illu"></div></figure>
        <footer><div><p id="copyright" style={{color:isTrue ?'#fff':'#343a40'}}>Mandar Jaurat © 2023</p></div></footer>
      </div>
    </div>
  );
}

export default App;