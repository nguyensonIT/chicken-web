import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

import { auth } from "../../../../App";

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).then(async (response) => {
    try {
      const token = await response.user.getIdToken();
      const decoded = jwtDecode(token);
      console.log(decoded);
    } catch (error) {
      console.log(error);
    }
  });
};
