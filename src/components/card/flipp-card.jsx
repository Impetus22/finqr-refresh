import "./flipp-card.css";
import Card from "./card"
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { FiTrash, FiPlusCircle, FiEdit } from 'react-icons/fi'; // Importa le icone cestino, aggiungi e modifica
import { Link, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { BASE_PATH } from "../../constants";
import { useAuth } from "../../AuthProvider";
import toast from "react-hot-toast";
import { AiOutlineEdit, AiOutlineExclamationCircle } from "react-icons/ai";


function FlippableCard({ id, uuid, text, available, rewardType, rewardAmount, objectAssociated, description, contact, setShowArrows}) {

    const [showFront,setShowFront] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [paypalEmail, setPaypalEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const { tokens } = useAuth();

    const [showModalChange, setShowModalChange] = useState(false);

    const [editedFields, setEditedFields] = useState({
      objectAssociated: objectAssociated,
      description: description,
      contact: contact,
    });

    const [editableFields, setEditableFields] = useState({
      objectAssociated: false,
      description: false,
      contact: false,
  });


    const handleEmailChange = (e) => {
      setPaypalEmail(e.target.value);
    };

    const handleModalOpen = () => {
      setShowModal(true);
      disablePageScroll();
      setShowArrows(false); // Nascondi le frecce quando la modale viene aperta
    };

    const handleModalChangeOpen = () => {
      setShowModalChange(true);
      disablePageScroll();
      setShowArrows(false); // Nascondi le frecce quando la modale viene aperta
    };
    const handleModalChangeClose = () => {
      setShowModalChange(false);
      enablePageScroll();
      setShowArrows(true); // Mostra le frecce quando la modale viene chiusa

    };
  
    const handleModalClose = () => {
      setShowModal(false);
      enablePageScroll();
      setErrorEmail('');  
      setShowArrows(true); // Mostra le frecce quando la modale viene chiusa

    };
    const handleSendDeleteDeposit = async () => {
      setErrorEmail('');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(paypalEmail)) {
        setErrorEmail('Email non valida');
        return;
      }
      try {
        // Simulazione di una richiesta di login al backend
  
        const response = await fetch(BASE_PATH+`/api/v1/user/qrs/delete/${id}?accountPayPal=${paypalEmail}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokens.accessToken}`, // Assicurati di includere l'access token nell'intestazione
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        if (response.status === 200) {
          //todo settare cookie con tempo giusto ecc..
          toast.success("Delete success, your deposit fund was sent to the paypal email specified")
          window.location.reload(); // Ricarica la pagina

  } else{
    //todo err boundary & correct error
    toast.error("Something went wrong");
    return;
  }

} catch (error) {
  console.error('Errore durante la delete del qr:', error);
  toast.error("Something went wrong");
} finally {
            setShowModal(false);
            enablePageScroll();
      }
      // Chiudi la modale dopo l'invio dell'email
    };

    const handleSendDeleteCash = async () => {
      try {
        // Simulazione di una richiesta di login al backend
  
        const response = await fetch(BASE_PATH+`/api/v1/user/qrs/delete/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokens.accessToken}`, // Assicurati di includere l'access token nell'intestazione
            'Content-Type': 'application/json',
          },
        });
        const responseData = await response.json();
        if (response.status === 200) {
          console.log("change:",response)
          //todo settare cookie con tempo giusto ecc..
          toast.success("Delete success")

  } else{
    //todo err boundary & correct error
    toast.error("Something went wrong");
    return;
  }

} catch (error) {
        console.error('Errore durante la delete del qr:', error);
        toast.error("Something went wrong");
} finally {
            setShowModal(false);
            enablePageScroll();
      }
      // Chiudi la modale dopo l'invio dell'email
    };

    const handleSendChangeDetails = async () => {
// Controlla se i campi di editedFields sono nulli
if (!editedFields.objectAssociated || !editedFields.description || !editedFields.contact) {
  toast.error("Please fill in all fields");
  return;
}

// Controlla se almeno uno dei campi è diverso dal valore attuale
if (
  editedFields.objectAssociated === objectAssociated &&
  editedFields.description === description &&
  editedFields.contact === contact
) {
  toast.error("Please make at least one change");
  return;
}     

try {
        // Simulazione di una richiesta di login al backend
  
        const response = await fetch(BASE_PATH+`/api/v1/user/qrs/modify/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokens.accessToken}`, // Assicurati di includere l'access token nell'intestazione
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            objectAssociated: editedFields.objectAssociated,
            description: editedFields.description,
            contact: editedFields.contact })
        });
        const responseData = await response.json();
        if (response.status === 200) {
          //todo settare cookie con tempo giusto ecc..
          window.location.reload(); // Ricarica la pagina
          toast.success("Change success")

  } else{
    //todo err boundary & correct error
    toast.error("Something went wrong");
    return;
  }

} catch (error) {
        console.error('Errore durante la change del qr:', error);
        toast.error("Something went wrong");
} finally {
            setShowModal(false);
            enablePageScroll();
      }
      // Chiudi la modale dopo l'invio dell'email
    };

    let modalContent;
    if (rewardType === 'DEPOSIT') {
      modalContent = (
<div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <AiOutlineExclamationCircle className="text-red-500 h-6 w-6 mr-2 sm:mr-4" />

                    <h3 className="text-lg leading-6 font-medium text-white">Delete QR</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300 mb-2">Insert the paypal email where you want the deposit to be returned:</p>
                      <input
                        type="email"
                        className="border rounded-lg w-full px-4 py-2 mb-4"
                        placeholder="youremail@domain.com"
                        value={paypalEmail}
                        onChange={handleEmailChange}
                      />
                      {errorEmail && <p className="text-red-500">{errorEmail}</p>}

                      <button
                        className="w-full bg-white hover:bg-gray-200 hover:text-blue-800 text-black py-2 rounded-md"
                        onClick={handleSendDeleteDeposit}
                      >
                        Confirm deletion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleModalClose}
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (rewardType === 'CASH') {
      modalContent = (
<div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <AiOutlineExclamationCircle className="text-red-500 h-6 w-6 mr-2 sm:mr-4" />

                    <h3 className="text-lg leading-6 font-medium text-white">Delete QR</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300 mb-2">The reward moality was set to CASH so no deposit fund should be returned</p>

                      <button
                        className="w-full bg-white hover:bg-gray-200 hover:text-blue-800 text-black py-2 rounded-md"
                        onClick={handleSendDeleteCash}
                      >
                        Confirm deletion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleModalClose}
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    
    return(
        <div className="flippable-card-container">
            <CSSTransition 
                in={showFront}
                timeout={300}
                classNames='flip'
            >
                <Card
                    uuid={uuid}
                    text={text}
                    available={available}
                    rewardType={rewardType}
                    rewardAmount={rewardAmount}
                    objectAssociated={objectAssociated}
                    description={description}
                    contact={contact}
                    onClick={() => {
                        setShowFront((v) => !v);
                    }}
                />
            </CSSTransition>
            <div className="buttons-container">
              <button className="left-button" onClick={handleModalOpen}>
                <FiTrash />
                <span>Delete QR</span>
              </button>
              <Link to = "/purchase">
                <button className="center-button">
                <FiPlusCircle />
                <span>Add QR</span>
                </button>
              </Link>
              <button className="right-button" onClick={handleModalChangeOpen}>
                <FiEdit />
                <span>Change QR</span>
              </button>
            </div>
            {showModal && (
        modalContent
      )}
      {showModalChange && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-center">
            <AiOutlineExclamationCircle className="text-red-500 h-6 w-6 mr-2 sm:mr-4" />
            <h3 className="text-lg leading-6 font-medium text-white">Change QR</h3>
          </div>
          <div className="mt-2 sm:text-left">
          <p className="text-sm text-gray-300 mb-2">Fill in the labels you want to modify</p>
          <div className="mb-4">
                                                <div className="flex items-center mb-2">
                                                    <input
                                                        type="text"
                                                        className={"border rounded-lg w-full px-4 py-2 mr-2 " + (editableFields.objectAssociated ? "" : "bg-gray-600 cursor-not-allowed")}
                                                        value={editedFields.objectAssociated}
                                                        onChange={(e) => setEditedFields({ ...editedFields, objectAssociated: e.target.value })}
                                                        readOnly={!editableFields.objectAssociated}
                                                    />
                                                    <AiOutlineEdit className={"cursor-pointer " + (editableFields.objectAssociated ? "text-gray-500" : "text-blue-500")} onClick={() => setEditableFields({ ...editableFields, objectAssociated: !editableFields.objectAssociated })} />
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <input
                                                        type="text"
                                                        className={"border rounded-lg w-full px-4 py-2 mr-2 " + (editableFields.description ? "" : "bg-gray-600 cursor-not-allowed")}
                                                        value={editedFields.description}
                                                        onChange={(e) => setEditedFields({ ...editedFields, description: e.target.value })}
                                                        readOnly={!editableFields.description}
                                                    />
                                                    <AiOutlineEdit className={"cursor-pointer " + (editableFields.description ? "text-gray-500" : "text-blue-500")} onClick={() => setEditableFields({ ...editableFields, description: !editableFields.description })} />
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        className={"border rounded-lg w-full px-4 py-2 mr-2 " + (editableFields.contact ? "" : "bg-gray-600 cursor-not-allowed")}
                                                        value={editedFields.contact}
                                                        onChange={(e) => setEditedFields({ ...editedFields, contact: e.target.value })}
                                                        readOnly={!editableFields.contact}
                                                    />
                                                    <AiOutlineEdit className={"cursor-pointer " + (editableFields.contact ? "text-gray-500" : "text-blue-500")} onClick={() => setEditableFields({ ...editableFields, contact: !editableFields.contact })} />
                                                </div>
                                            </div>

                                            <button
                                                className="w-full bg-white hover:bg-gray-200 hover:text-blue-800 text-black py-2 rounded-md"
                                                onClick={handleSendChangeDetails}
                                            >
                                              Change
                                            </button>
          </div>
        </div>
        <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleModalChangeClose}
                                >
                                    Chiudi
                                </button>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
    );
}

export default FlippableCard;