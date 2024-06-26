import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people, setPeople]=useState(data);
  const [index, setIndex]=useState(0);

  useEffect(()=>{
    const lastIndex=people.length-1;
    if(index<0){
      setIndex(lastIndex);
    }
    if(index>lastIndex){
      setIndex(0);
    }
  },[index,people])

  useEffect(()=>{
    let slider=setInterval(()=>{
      setIndex(index+1);
    },3000)
    return ()=> clearInterval(slider);
  },[index])
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span> reviews
        </h2>
      </div>

      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          //* slider functionality with css classes and transform x
          let position='nextSlide';
          //* activeSlide should be the index value of state and index value of map that is personIndex. so
          if(personIndex===index){
            position='activeSlide'
          }
          if(personIndex===index-1 || (index===0 && personIndex=== people.length-1)){
            // The above OR condition is to display the last slide when index is equal to 0 because here are trying to achieve an circular linked slider where if the 1st slider is being displayed and we clicked left button to display the left side of the slider then the last slider will be displayed on the place of 1st slider.
            //* to see the result of this,comment the opacity to 0 in index.css file for the class of article.
            position='lastSlide'
          }

          return (
            <article key={id} className={position}>
              <img src={image} alt="" className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon"></FaQuoteRight>
            </article>
          );
        })}

        <button className="prev" onClick={()=>setIndex(index-1)}>
          <FiChevronLeft></FiChevronLeft>
        </button>
        <button className="next" onClick={()=>setIndex(index+1)}>
          <FiChevronRight></FiChevronRight>
        </button>
      </div>
    </section>
  );
}

export default App;
