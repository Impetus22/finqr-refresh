import "./flipp-card.css";
import Card from "./card"
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { FiTrash, FiPlusCircle, FiEdit } from 'react-icons/fi'; // Importa le icone cestino, aggiungi e modifica
import { Link } from "react-router-dom";


function FlippableCard() {

    const [showFront,setShowFront] = useState(true);

    return(
        <div className="flippable-card-container">
            <CSSTransition 
                in={showFront}
                timeout={300}
                classNames='flip'
            >
                <Card onClick={() => {
                    setShowFront((v) => !v);
                }}/>
            </CSSTransition>
            <div className="buttons-container">
  <button className="left-button">
    <FiTrash />
    <span>Delete QR</span>
  </button>
  <Link to = "/purchase"><button className="center-button">
    <FiPlusCircle />
    <span>Add QR</span>
  </button>
  </Link>
  <button className="right-button">
    <FiEdit />
    <span>Change QR</span>
  </button>
</div>
        </div>
    );
}

export default FlippableCard;