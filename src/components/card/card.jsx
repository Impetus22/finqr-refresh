import { useRef, useState } from "react";
import { FiCopy, FiDownload } from 'react-icons/fi'; // Importa le icone di copia e download
import QRCode from 'qrcode.react'; // Importa il componente QRCode
import "./card.css"
import "./flip-transition.css"


function Card({onClick}) {

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

    const handleDownload = () => {
        // Creazione di un elemento <a> per il download
        const qrCodeDataURL = document.querySelector('.qrcode-container').toDataURL();
        const downloadLink = document.createElement('a');
        downloadLink.href = qrCodeDataURL;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    

    const text = "8d8ea0eb-da88-46a0-b835-11fb005b3735";
    const available = true; // Esempio: disponibile
    const rewardType = "Tipo di ricompensa";
    const rewardAmount = "10";
    const objectAssociated = "Oggetto associato";
    const contact = "Contatto";

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
                    value={text}
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
          <QRCode value={text} size={160} className="qrcode-container"/>
          <div className="status-container">
            <div className={`status-circle ${available ? 'available' : 'unavailable'}`}></div>
            <span className="status-text">{available ? 'Enabled' : 'Disabled'}</span>
            <div className="download-container" onClick={handleDownload}>
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