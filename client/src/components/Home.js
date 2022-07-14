import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

const Home = (props) => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { notes } = context;
  
  return (
    <div>
     
     <Notes salert={props.salert}/>
      
    </div>
  );
};

export default Home;