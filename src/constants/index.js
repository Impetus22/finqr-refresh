import logocircle from "../assets/logocircle.svg";

import trolley from "../assets/trolley.png";
import bag from "../assets/bag.png";
import laptop from "../assets/laptop.png";
import phone from "../assets/phone.png";
import cat from "../assets/cat.png";
import wallet from "../assets/wallet.png";
import dog from "../assets/dog.png";
import keys from "../assets/keys.png"; 

/* import trolley from "../assets/svgprova/trolley.svg";
import bag from "../assets/svgprova/bag.svg";
import laptop from "../assets/svgprova/laptop.svg";
import phone from "../assets/svgprova/phone.svg";
import cat from "../assets/svgprova/cat.svg";
import wallet from "../assets/svgprova/wallet.svg";
import dog from "../assets/svgprova/dog.svg";
import keys from "../assets/svgprova/keys.svg"; */

import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import card1icon from "../assets/card1icon.svg"; 
import card2icon from "../assets/card2icon.svg"; 
import card3icon from "../assets/card3icon.svg"; 
import card4icon from "../assets/card4icon.svg"; 
import card5icon from "../assets/card5icon.svg"; 
import card6icon from "../assets/card6icon.svg"; 

  export const navigation = [
    {
      id: "0",
      title: "Home",
      url: "/",
    },
    {
      id: "1",
      title: "Found",
      url: "/found",
    },
    {
      id: "2",
      title: "dashboard",
      url: "/dashboard",
    },
    {
      id: "3",
      title: "contact",
      url: "/contact",
    },
    {
      id: "4",
      title: "purchase",
      url: "/purchase",
    },
    {
      id: "5",
      title: "register",
      url: "/register",
      onlyMobile: true,
    },
    {
      id: "6",
      title: "Sign in",
      url: "/login",
      onlyMobile: true,
    },
  ];

  export const benefits = [
    {
      id: "0",
      title: "1. Choose an object to assure",
      text: "After you identified the item, insert your contact informations and some brief description about the item ",
      backgroundUrl: "./src/assets/card-1.svg",
      iconUrl: card1icon,
      //imageUrl: logocircle,
    },
    {
      id: "1",
      title: "2. Choose a reward amount & reward modality for the founder",
      text: "You can insert the reward amount to be given to the person that finds and return your item, it could be cash reward or deposited in the platform",
      backgroundUrl: "./src/assets/card-2.svg",
      iconUrl: card2icon,
      //imageUrl: logocircle,
      light: true,
    },
    {
      id: "2",
      title: "3. After purchasing, make sure you insert the QR in the item and make it clear and visible",
      text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      backgroundUrl: "./src/assets/card-3.svg",
      iconUrl: card3icon,
      //imageUrl: logocircle,
    },
    {
      id: "3",
      title: "4. If lost...",
      text: "The founder will scan the QR and see your contact information and the reward available if returned, he would be more tempted to give it back after seeing the reward so will contact you",
      backgroundUrl: "./src/assets/card-1.svg",
      iconUrl: card4icon,
      //imageUrl: logocircle,
      light: true,
    },
    {
      id: "4",
      title: "5. Once your item is returned  ",
      text: "You give the founder the reward, if cash then by hand, otherwise you will give a secret key that is associated to your QR, this secret is visible in your qrs dashboard if the reward type is DEPOSIT",
      backgroundUrl: "./src/assets/card-2.svg",
      iconUrl: card5icon,
      //imageUrl: logocircle,
    },
    {
      id: "5",
      title: "6. You are all done",
      text: "Founder will use the FOUND section to insert the secret key and will be acredited the reward",
      backgroundUrl: "./src/assets/card-3.svg",
      iconUrl: card6icon,
      //imageUrl: logocircle,
    },
  ];

  export const securePaymentText =
  "When you purchase the QR you can set the reward modality in two different ways: 1. CASH reward, once the item is returned you give the reward cash to the founder 2. DEPOSIT reward on the platform, once the item is returned you simply provide the founder with a secret key to unlock the reward on the platform, you don't have to do anything else";

  export const dashboardText =
  "In the MY QRS section you will see all you purchased and active QRs, you can disable them easily, if the reward was set on the platform it will automatically be returned to you by PayPal";

  export const qrText =
  "Make sure the QR is well visible, so the founder will see it clearly. You can put it behind your phone cover, inside a wallet, stick it to your pc, on your pet's collar and so on. It's up to you";

export const collabContent = [
  {
    id: "0",
    title: "Apply your QR code everywhere you want!",
    text: qrText,
  },
  {
    id: "1",
    title: "Secure payment",
    text: securePaymentText,
  },
  {
    id: "2",
    title: "Personal dashboard",
    text: dashboardText,
  },
];

export const collabApps = [
  {
    id: "0",
    title: "trolley",
    icon: trolley,
    width: 46,
    height: 36,
  },
  {
    id: "1",
    title: "bag",
    icon: bag,
    width: 43,
    height: 38,
  },
  {
    id: "2",
    title: "laptop",
    icon: laptop,
    width: 46,
    height: 35,
  },
  {
    id: "3",
    title: "phone",
    icon: phone,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "cat",
    icon: cat,
    width: 50,
    height: 46,
  },
  {
    id: "5",
    title: "wallet",
    icon: wallet,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "dog",
    icon: dog,
    width: 46,
    height: 35,
  },
  {
    id: "7",
    title: "keys",
    icon: keys,
    width: 38,
    height: 32,
  },
];

export const socials = [
  {
    id: "0",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  }
];
  /*
  export const heroIcons = [homeSmile, file02, searchMd, plusSquare];
  
  export const notificationImages = [notification4, notification3, notification2];
  
  export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];
  
  export const brainwaveServices = [
    "Photo generating",
    "Photo enhance",
    "Seamless Integration",
  ];
  
  export const brainwaveServicesIcons = [
    recording03,
    recording01,
    disc02,
    chromecast,
    sliders04,
  ];
  
  export const roadmap = [
    {
      id: "0",
      title: "Voice recognition",
      text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
      date: "May 2023",
      status: "done",
      imageUrl: roadmap1,
      colorful: true,
    },
    {
      id: "1",
      title: "Gamification",
      text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap2,
    },
    {
      id: "2",
      title: "Chatbot customization",
      text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
      date: "May 2023",
      status: "done",
      imageUrl: roadmap3,
    },
    {
      id: "3",
      title: "Integration with APIs",
      text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap4,
    },
  ];
  
  export const collabText =
    "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";
  
  export const collabContent = [
    {
      id: "0",
      title: "Seamless Integration",
      text: collabText,
    },
    {
      id: "1",
      title: "Smart Automation",
    },
    {
      id: "2",
      title: "Top-notch Security",
    },
  ];
  
  export const collabApps = [
    {
      id: "0",
      title: "Figma",
      icon: figma,
      width: 26,
      height: 36,
    },
    {
      id: "1",
      title: "Notion",
      icon: notion,
      width: 34,
      height: 36,
    },
    {
      id: "2",
      title: "Discord",
      icon: discord,
      width: 36,
      height: 28,
    },
    {
      id: "3",
      title: "Slack",
      icon: slack,
      width: 34,
      height: 35,
    },
    {
      id: "4",
      title: "Photoshop",
      icon: photoshop,
      width: 34,
      height: 34,
    },
    {
      id: "5",
      title: "Protopie",
      icon: protopie,
      width: 34,
      height: 34,
    },
    {
      id: "6",
      title: "Framer",
      icon: framer,
      width: 26,
      height: 34,
    },
    {
      id: "7",
      title: "Raindrop",
      icon: raindrop,
      width: 38,
      height: 32,
    },
  ];
  
  export const pricing = [
    {
      id: "0",
      title: "Basic",
      description: "AI chatbot, personalized recommendations",
      price: "0",
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost",
      ],
    },
    {
      id: "1",
      title: "Premium",
      description: "Advanced AI chatbot, priority support, analytics dashboard",
      price: "9.99",
      features: [
        "An advanced AI chatbot that can understand complex queries",
        "An analytics dashboard to track your conversations",
        "Priority support to solve issues quickly",
      ],
    },
    {
      id: "2",
      title: "Enterprise",
      description: "Custom AI chatbot, advanced analytics, dedicated account",
      price: null,
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost",
      ],
    },
  ];
  
  export const benefits = [
    {
      id: "0",
      title: "Ask anything",
      text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: "Improve everyday",
      text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: "Connect everywhere",
      text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
    },
    {
      id: "3",
      title: "Fast responding",
      text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
      backgroundUrl: "./src/assets/benefits/card-4.svg",
      iconUrl: benefitIcon4,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "4",
      title: "Ask anything",
      text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
      backgroundUrl: "./src/assets/benefits/card-5.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "5",
      title: "Improve everyday",
      text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
      backgroundUrl: "./src/assets/benefits/card-6.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
    },
  ];
  
  export const socials = [
    {
      id: "0",
      title: "Discord",
      iconUrl: discordBlack,
      url: "#",
    },
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "#",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "#",
    },
    {
      id: "3",
      title: "Telegram",
      iconUrl: telegram,
      url: "#",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "#",
    },
  ];
  */