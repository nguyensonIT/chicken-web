import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../../../App";

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider).then(async (response) => {
    try {
      const token = await response.user.getIdToken();
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  });
};
