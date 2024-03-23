import { useRef, useState } from "react";
import { FiCopy, FiDownload } from 'react-icons/fi'; // Importa le icone di copia e download
import QRCode from 'qrcode.react'; // Importa il componente QRCode
import "./card.css"
import "./flip-transition.css"


function Card({ uuid, text, emptyQrSequence, available, rewardType, rewardAmount, objectAssociated, description, contact, onClick }) {

    const textRef = useRef(null);
    const [copied, setCopied] = useState(false); // Stato per tracciare se il testo è stato copiato con successo

    const copyTextToClipboard = () => {
        if (textRef.current) {
            textRef.current.select();
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Resetta lo stato "copied" dopo 2 secondi
        }
    };

    function downloadImage(imageDataUrl) {
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = 'qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    

/*     const uuid = "8d8ea0eb";
    const text = "8d8ea0eb-da88-46a0-b835-11fb005b3735";
    const available = true; // Esempio: disponibile
    const rewardType = "Tipo di ricompensa";
    const rewardAmount = "10";
    const objectAssociated = "Oggetto associato";
    const description = "";
    const contact = "Contatto"; */

    return(
        
        <div className="card">
            <div className="card-back"> 
            <div className="card-back-content">

            <p className="back-label">Secret reward key:</p>
            <div className="back-text-container">
                <input
                    ref={textRef}
                    type="text"
                    readOnly
                    value={uuid}
                    className="back-text"
                />
                <div className="copy-icon" onClick={copyTextToClipboard}>
                    <FiCopy />
                </div>
            </div>
            </div>
                {copied && <div className="copy-tooltip">Copied!</div>}
            <button className="flip-button" onClick={onClick}>
                Hide secret key
            </button>
            </div>
            <div className="card-front">  
            <div className="front-content">
            {/* <img src={text} alt="QR Code" className="qrcode-container"/> */}
                 <img src={`data:image/png;base64,${emptyQrSequence}`} alt="QR Code" className="qrcode-container"/>
          {/* <QRCode value={text} size={160} className="qrcode-container"/> */}
          <div className="status-container">
            <div className={`status-circle ${available ? 'available' : 'unavailable'}`}></div>
            <span className="status-text">{available ? 'Enabled' : 'Disabled'}</span>
            <div className="download-container" onClick={() => downloadImage(`data:image/png;base64,${text}`)}>
              <FiDownload className="download-icon" />
              <span className="download-text">Download</span>
            </div>
          </div>
          <div className="reward-info">
    <ul className="reward-text-container">
        <li><span className="bullet">&#8226;</span> Reward type: {rewardType}</li>
        <li><span className="bullet">&#8226;</span> Reward amount: {rewardAmount}</li>
        <li><span className="bullet">&#8226;</span> Object associated: {objectAssociated}</li>
        <li><span className="bullet">&#8226;</span> Contact: {contact}</li>
    </ul>
</div>
        </div>
        <button className="flip-button" onClick={onClick}>
          Show secret key
        </button>
            </div>
        </div>
    )
}
export default Card;