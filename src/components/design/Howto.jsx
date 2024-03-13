import curve1 from "../../assets/curve-1.svg";
import curve2 from "../../assets/curve-2.svg";


export const GradientLight = () => {
    return (
      <div className="absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" />
    );
  };
  export const RightCurve = () => {
    return (
      <div className="hidden absolute top-1/2 left-full w-[10.125rem] -mt-1 ml-10 pointer-events-none xl:block">
        <img src={curve2} width={162} height={76} alt="Curve 2" />
      </div>
    );
  };
  
  export const LeftCurve = () => {
    return (
      <div className="hidden absolute top-1/2 right-full w-[32.625rem] -mt-1 mr-10 pointer-events-none xl:block">
        <img src={curve1} width={522} height={182} alt="Curve 1" />
      </div>
    );
  };