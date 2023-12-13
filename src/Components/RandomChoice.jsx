import React, { useState,useRef } from 'react'

const RandomChoice = () => {
  const [randomChoice,setRandomChoice]=useState("");
  const[choices,setChoices]=useState([]);

  const choicesRef = useRef([]);

  const createTags=(e)=>{
    const tags=randomChoice
    .split(",")
    .filter((tag)=>tag.trim()!=="")
    .map((tag) => tag.trim());
    setChoices(tags)
    
    if(e.key==="Enter"){
      setTimeout(() => {
        setRandomChoice("");
      }, 300);
      randomSelect();
    }
  };

  const randomSelect = () => {
    const times = 10;
    let int = 300;
  
    const interval = setInterval(() => {
      const randomChoice = pickRandomly();
  
      if (randomChoice) {
        highlightFunction(randomChoice);
  
        setTimeout(() => {
          unhighlightFunction(randomChoice);
        }, 300);
      }
    }, int);
  
    setTimeout(() => {
      clearInterval(interval);
  
      setTimeout(() => {
        const randomChoice = pickRandomly();
  
        if (randomChoice) {
          highlightFunction(randomChoice);
        }
      }, int);
    }, int * times);
  };
  
  const pickRandomly = () => {
    const availableChoices = choicesRef.current.filter((choice) => choice !== null);
    
    if (availableChoices.length === 0) {
      return null; 
    }
  
    return availableChoices[Math.floor(Math.random() * availableChoices.length)];
  };
  

  const highlightFunction=(tag)=>{

    tag.classList.add("bg-[#273c75]");
    tag.classList.add("text-white");
    tag.classList.remove("bg-[#f0932b]");
    tag.classList.remove("text-white");
   
  } 

  const unhighlightFunction=(tag)=>{
    tag.classList.remove("bg-[#273c75]");
    tag.classList.remove("text-white");
    tag.classList.add("bg-[#f0932b]");
    tag.classList.add("text-white");
  }
  return (
    <div className="bg-[#2b88f0] mx-auto flex items-center flex-col justify-center h-screen">
      <div className='flex items-center justify-center flex-col'>
        <h1 className="text-center text-white my-8 font-bold text-2xl font-sans">
          Enter all of the choices divided by a comma (','). <br /> Press enter
          when you're done
        </h1>
        <textarea
          className="flex items-center justify-center mx-auto p-2 outline-none rounded"
          id="Choices"
          cols="70"
          value={randomChoice}
          rows="5"
          placeholder="Enter choice here..."
          onChange={(e) => setRandomChoice(e.target.value)}
          onKeyDown={createTags}
        ></textarea>
       
      </div>
      <ul className="tags flex flex-wrap w-2/5 gap-6 mt-10 justify-center text-white mb-20">
        {choices.map((choice, index) => {
          return (
            <li
              ref={(ele) => (choicesRef.current[index] = ele)}
              key={index}
              className={`
              px-5 py-2 rounded-xl bg-[#f0932b] text-white font-semibold shadow-lg capitalize transition-all duration-100`}
            >
              {choice}
            </li>
          );
        })}

      </ul>
    </div>
  )
}

export default RandomChoice
