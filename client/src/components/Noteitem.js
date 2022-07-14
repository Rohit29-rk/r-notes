import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div
          className="card-body"
          style={{
            backgroundColor: "#e17272",
            boxShadow: "rgb(70 70 84) 5px 5px 20px 7px",
          }}
        >
           
          <div className="d-flex align-items-center" style={{borderBottom: "1px solid black",
    marginBottom: "20px"}}>
         
            
              <h4 className="card-title "><b>{note.title} </b></h4>
            
            
            

            
          </div>
          

          <p className="card-text my-4">{note.description}</p>
          <i
              className="fas fa-trash-alt mx-2"
              style={{
                padding: "10px",
                background: "hwb(0deg 100% 0%)",
                borderRadius: "50px",
                boxShadow: "inset rgb(144 144 151) 0px 0px 20px 0px",
              }}
              onClick={() => {
                deleteNote(note._id);
                props.salert("Note Deleted Successfully", "success");
              }}
            ></i>
            <i
              className="fas fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
              style={{
                padding: "10px",
                background: "hwb(0deg 100% 0%)",
                borderRadius: "50px",
                boxShadow: "inset rgb(144 144 151) 0px 0px 20px 0px",
              }}
            ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
