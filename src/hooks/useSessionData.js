import { useEffect, useState, useCallback } from "react";
import { auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const sessionRef = collection(db, "sessions");

const lastWeek = new Date(
  new Date().getTime() - 7 * 24 * 60 * 60 * 1000
).toISOString();

const lastMonth = new Date(
  new Date().getTime() - 30 * 24 * 60 * 60 * 1000
).toISOString();

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const isoTodayDateString = `${year}-${month}-${day}T00:00:00.000Z`;

export const useSessionData = () => {
  const [sessionsData, setSessionData] = useState([]);
  const [todaysSession, setTodaysSession] = useState(null);
  const [lastWeekData, setLastWeekData] = useState(0);
  const [lastMonthData, setLastMonthData] = useState(0);
  const [user] = useAuthState(auth);

  const fetchSessionData = useCallback(async () => {
    try {
      const sessionQuery = query(sessionRef, where("userId", "==", user?.uid));
      const sessionsSnap = await getDocs(sessionQuery);
      if (sessionsSnap) {
        const sessionsArray = sessionsSnap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setSessionData(sessionsArray);
      } else {
        console.log("no such document");
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?.uid]);

  const fetchTodaysSession = useCallback(async () => {
    try {
      const todaysSessionQuery = query(
        sessionRef,
        where("startTime", ">=", isoTodayDateString),
        where("userId", "==", user?.uid)
      );
      const todaysSessionSnap = await getDocs(todaysSessionQuery);
      const todaysSessionData =
        todaysSessionSnap.docs.length === 0
          ? null
          : {
              ...todaysSessionSnap.docs[0]?.data(),
              id: todaysSessionSnap.docs[0]?.id,
            };
      setTodaysSession(todaysSessionData);
    } catch (error) {
      console.error(error);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  useEffect(() => {
    fetchTodaysSession();
  }, [fetchTodaysSession]);

  useEffect(() => {
    const fetchLastWeekData = async () => {
      try {
        const lastWeekSessionQuery = query(
          sessionRef,
          where("startTime", ">=", lastWeek),
          where("userId", "==", user?.uid)
        );
        const lastWeekSessionSnap = await getDocs(lastWeekSessionQuery);
        const lastWeekSessionData = lastWeekSessionSnap.docs.map((doc) =>
          doc.data()
        );

        const totalWeekTime = lastWeekSessionData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.totalTime,
          0
        );

        setLastWeekData(totalWeekTime);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLastWeekData();
  }, [user?.uid]);

  useEffect(() => {
    const fetchLastMonthData = async () => {
      try {
        const lastMonthSessionQuery = query(
          sessionRef,
          where("startTime", ">=", lastMonth),
          where("userId", "==", user?.uid)
        );
        const lastMonthSessionSnap = await getDocs(lastMonthSessionQuery);
        const lastMonthSessionData = lastMonthSessionSnap.docs.map((doc) =>
          doc.data()
        );

        const totalMonthTime = lastMonthSessionData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.totalTime,
          0
        );

        setLastMonthData(totalMonthTime);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastMonthData();
  }, [user?.uid]);

  const overallData = sessionsData.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalTime,
    0
  );

  const addSession = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "sessions"), {
        ...data,
        userId: user?.uid,
      });
      fetchTodaysSession();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateSession = async (data) => {
    const documentId = data.id;
    delete data.id;
    const docRef = doc(db, "sessions", documentId);
    try {
      await updateDoc(docRef, { ...data, userId: user?.uid });
      fetchTodaysSession();
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return {
    sessionsData,
    addSession,
    updateSession,
    todaysSession,
    lastWeekData,
    lastMonthData,
    overallData,
  };
};
