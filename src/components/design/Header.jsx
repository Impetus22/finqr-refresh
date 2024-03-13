import background from "../../assets/logocircle.svg"; //TODO: settare immagine di background per il menu

export const HamburgerMenu = () => {
    return (
      <div className="absolute inset-0 pointer-events-none lg:hidden">
        <div className="absolute inset-0 opacity-[.01]">
          <img
            className="w-full h-full object-cover"
            src={background}
            width={688}
            height={953}
            alt="Background"
          />
        </div>
      </div>
    );
  };