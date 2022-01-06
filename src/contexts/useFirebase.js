import React, { useEffect, useState, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  arrayUnion,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { auth, db, storage } from "../helpers/Firebase";
import useGlobalData from "./useGlobalData";

const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [userChatMessages, setUserChatMessages] = useState([]);
  const { setInstagramData } = useInstagram();
  const {
    userData,
    socialAccounts,
    message,
    image,
    chatMessages,
    setUserData,
    setSocialAccounts,
    setPendingPosts,
    setMessage,
    setImage,
    setLoading,
    setLoadingMessage,
    setSnackbarMessage,
    setVisible,
  } = useGlobalData();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const signInUser = async (email, password) => {
    if (email === "" || password === "") {
      setSnackbarMessage("Email and Password fields can't be empty.");
      setVisible(true);
      return;
    }
    if (password.length < 6) {
      setSnackbarMessage("Password must be greater than 6 characters.");
      setVisible(true);
      return;
    }
    setLoading(true);
    setLoadingMessage("Signing in...");
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage("Invalid Email or Password. Please try again.");
        setVisible(true);
      });
  };

  const signUpUser = async (email, password) => {
    if (email === "" || password === "") {
      setSnackbarMessage("Email and Password fields can't be empty.");
      setVisible(true);
      return;
    }
    if (password.length < 6) {
      setSnackbarMessage("Password must be greater than 6 characters.");
      setVisible(true);
      return;
    }
    setLoading(true);
    setLoadingMessage("Registering user...");
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setDoc(doc(db, "users", userCredentials.user.uid), {
          userEmail: userCredentials.user.email,
          socialAccounts: [],
          name: "",
          profilePic: "",
        });
        setLoading(false);
        setSnackbarMessage("User Registered Successfully.");
        setVisible(true);
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage("Registration failed. Please try again.");
        setVisible(true);
      });
  };

  const updateUserData = async (name, profile_picture) => {
    setLoading(true);
    let imageUrl = "";
    if (profile_picture) {
      let randomId = uuid.v4();
      let fileExtension = profile_picture.split(".").pop();
      let fileName = `${randomId}.${fileExtension}`;
      let response = await fetch(profile_picture);
      let blob = await response.blob();
      setLoadingMessage("Uploading image to cloud...");
      const imageRef = ref(storage, `profile_picture/${fileName}`);

      await uploadBytes(imageRef, blob).then((snapshot) => {});
      await getDownloadURL(imageRef).then((url) => {
        imageUrl = url;
      });
    }
    setLoadingMessage("Updating user profile...");
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      name: name,
      profilePic: imageUrl,
    })
      .then(() => {
        setLoading(false);
        setSnackbarMessage("User profile updated.");
        setVisible(true);
        getUserData();
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage("An error has occured. Please try again.");
        setVisible(true);
      });
  };

  const getUserData = async () => {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    }
  };

  const getAllUsers = async () => {
    setAllUsers([]);
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      setAllUsers((prevState) => [...prevState, doc.data()]);
    });
  };

  const addSocialAccount = async (name) => {
    setLoading(true);
    setLoadingMessage(`Linking to ${name}...`);
    await updateDoc(doc(db, "users", user.uid), {
      socialAccounts: arrayUnion(name),
    })
      .then(() => {
        setLoading(false);
        setSnackbarMessage(`${name} has linked successfully`);
        getUserData();
        setVisible(true);
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage("An error occured. Please try again.");
        setVisible(true);
      });
  };

  const addPost = async (
    postedBy,
    userImageURL,
    socialAccounts,
    caption,
    imageURL,
    status,
    timestamp
  ) => {
    let imageUrl = "";
    setLoading(true);
    if (image) {
      let randomId = uuid.v4();
      let fileExtension = image.split(".").pop();
      let fileName = `${randomId}.${fileExtension}`;
      let response = await fetch(image);
      let blob = await response.blob();
      setLoadingMessage("Uploading image to cloud...");
      const imageRef = ref(storage, `images/${fileName}`);

      await uploadBytes(imageRef, blob).then((snapshot) => {});
      await getDownloadURL(imageRef).then((url) => {
        imageUrl = url;
      });
    }
    if (status === "Pending") {
      setLoadingMessage("Scheduling post...");
    } else {
      setLoadingMessage("Posting Content...");
    }
    await addDoc(collection(db, "posts"), {
      posted_by: postedBy,
      user_image_url: userImageURL,
      user_id: user.uid,
      social_accounts: socialAccounts,
      caption: caption,
      media_url: imageURL,
      status: status,
      timestamp: timestamp,
    })
      .then(async (doc) => {
        let scheduledPostObject = {
          id: doc.id,
          timestamp: timestamp.getTime(),
        };
        await AsyncStorage.setItem(
          `@scheduled_post-${doc.id}`,
          JSON.stringify(scheduledPostObject)
        ).catch((error) => {
          console.error(error);
        });
        setLoading(false);
        if (status === "Pending") {
          setSnackbarMessage("Post has been scheduled.");
        } else {
          setSnackbarMessage("Post has been posted.");
        }
        setVisible(true);
        setMessage("");
        setSocialAccounts([]);
        setImage(null);
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage("An error has occured.");
        setVisible(true);
      });
  };

  const getPendingPosts = async () => {
    setPendingPosts([]);
    const q = query(collection(db, "posts"), where("user_id", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().status === "Pending") {
        const id = doc.id;
        const data = doc.data();
        data.id = id;
        setPendingPosts((prevState) => [...prevState, data]);
      }
    });
  };

  const checkPendingPosts = async (id) => {
    const key = `@scheduled_post-${id}`;
    const value = await AsyncStorage.getItem(key).catch((error) => {
      console.error(error);
    });
    if (value !== null) {
      const timestamp = JSON.parse(value).timestamp;
      if (timestamp >= new Date().getTime()) {
        // Don't post yet
      } else {
        // Post it
        const postRef = doc(db, "posts", id);
        await updateDoc(postRef, {
          status: "Posted",
        }).then(() => {
          console.log("Document has been updated!");
        });
      }
    }
  };

  const updatePendingPost = async (id) => {
    setLoading(true);
    setLoadingMessage("Updating scheduled post...");
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      status: "Posted",
      timestamp: new Date(),
    })
      .then(() => {
        setLoading(false);
        setSnackbarMessage("Post has been posted.");
        setVisible(true);
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage("An error has occured.");
        setVisible(true);
      });
  };

  const getSocialPosts = async (socialAccount) => {
    let instagramPosts = [];
    // const q = query(collection(db, "posts"), where("user_id", "==", user.uid));
    const querySnapshot = await getDocs(collection(db, "posts"));
    // const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().social_accounts.includes(socialAccount)) {
        if (doc.data().status === "Posted") {
          instagramPosts.push(doc.data());
        }
      }
    });
    setInstagramData(instagramPosts);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setSnackbarMessage("Reset password has been sent to your email.");
        setVisible(true);
      })
      .catch((error) => {
        setSnackbarMessage("An error has occured. Please try again.");
        setVisible(true);
      });
  };

  const logout = async () => {
    setLoading(true);
    setLoadingMessage("Logging out...");
    await signOut(auth)
      .then((response) => {
        setUserData(null);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setSnackbarMessage(
          "An error occured while logging out. Please try again."
        );
        setVisible(true);
      });
  };

  const sendChatMessage = async (chatObject) => {
    let chatMessages = [];
    let isFound = false;
    chatMessages.push(chatObject.messageObject);
    const querySnapshot = await getDocs(collection(db, "chats"));
    if (querySnapshot.empty) {
      const docRef = await addDoc(collection(db, "chats"), {
        firstUser: chatObject.firstUser,
        secondUser: chatObject.secondUser,
        messages: chatMessages,
      }).then(() => {
        // setUserChatMessages((prevState) => [
        //   ...prevState,
        //   chatObject.messageObject,
        // ]);
      });
    } else {
      querySnapshot.forEach(async (docSnap) => {
        if (
          (docSnap.data().firstUser === chatObject.firstUser &&
            docSnap.data().secondUser === chatObject.secondUser) ||
          (docSnap.data().secondUser === chatObject.firstUser &&
            docSnap.data().firstUser === chatObject.secondUser)
        ) {
          isFound = true;
          await updateDoc(doc(db, "chats", docSnap.id), {
            messages: arrayUnion(chatObject.messageObject),
          }).then(() => {
            // PROVIDE ID FOR CHAT APP
            // setUserChatMessages((prevState) => [
            //   ...prevState,
            //   chatObject.messageObject,
            // ]);
          });
        }
      });
      if (!isFound) {
        const docRef = await addDoc(collection(db, "chats"), {
          firstUser: chatObject.firstUser,
          secondUser: chatObject.secondUser,
          messages: chatMessages,
        }).then(() => {
          // setUserChatMessages((prevState) => [
          //   ...prevState,
          //   chatObject.messageObject,
          // ]);
        });
      }
    }
  };

  const getChatMessages = async (firstUser, secondUser) => {
    let tempData = [];
    const querySnapshot = await getDocs(collection(db, "chats"));
    querySnapshot.forEach((docSnap) => {
      if (
        (docSnap.data().firstUser === firstUser.userEmail &&
          docSnap.data().secondUser === secondUser.userEmail) ||
        (docSnap.data().secondUser === firstUser.userEmail &&
          docSnap.data().firstUser === secondUser.userEmail)
      ) {
        tempData = docSnap.data().messages;
        // setUserChatMessages(docSnap.data().messages);
      }
    });
    setUserChatMessages(tempData);
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        allUsers,
        userChatMessages,
        setAllUsers,
        getAllUsers,
        signInUser,
        signUpUser,
        updateUserData,
        getUserData,
        addSocialAccount,
        addPost,
        getPendingPosts,
        checkPendingPosts,
        updatePendingPost,
        getSocialPosts,
        sendChatMessage,
        setUserChatMessages,
        getChatMessages,
        resetPassword,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default useFirebase = () => {
  return useContext(FirebaseContext);
};
