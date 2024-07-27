import GlobalStyles from "./components/GlobalStyles/index.jsx";
import Pages from "./pages/index.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxMpUiMGrynAy4XH_ItjN8jv3gs9nye9M",
  authDomain: "webchicken-6df9e.firebaseapp.com",
  projectId: "webchicken-6df9e",
  storageBucket: "webchicken-6df9e.appspot.com",
  messagingSenderId: "563007130086",
  appId: "1:563007130086:web:432a80b8cb6ef700ee6e27",
  measurementId: "G-X8637CWB1J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

function App() {
  return (
    <GlobalStyles>
      <ToastContainer />
      <Pages />
    </GlobalStyles>
  );
}

export default App;
