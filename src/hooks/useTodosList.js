import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAlert } from "./useAlert";

export const useTodosList = () => {
  const [todos, setTodos] = useState([]);
  const [wholeTodos, setWholeTodos] = useState();
  const [user] = useAuthState(auth);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const { showAlert } = useAlert();

  const fetchTodos = useCallback(async () => {
    try {
      setIsDataFetching(true);
      const todosRef = collection(db, "todos");
      const todosSnap = await getDocs(todosRef);
      setWholeTodos(todosSnap?.docs);
    } catch (e) {
      console.log("No such document!");
    } finally {
      setIsDataFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    fetchTodos();
  }, [user?.uid, fetchTodos, isDataChanged]);

  useEffect(() => {
    if (!wholeTodos) {
      return;
    }

    const newTodos = [];
    wholeTodos.forEach((doc) => {
      if (doc.data().userId === user?.uid) {
        const data = {
          ...doc.data(),
          id: doc.id,
        };
        newTodos.push(data);
      }
    });
    setTodos(newTodos);
  }, [wholeTodos, user?.uid]);

  const addTodo = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        ...data,
        userId: user?.uid,
        createdAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      throw new Error("Something went wrong, please try again");
    }
  };

  const updateTodo = async (data) => {
    try {
      setIsDataChanged(false);
      const documentId = data.id;
      delete data.id;
      const docRef = doc(db, "todos", documentId);
      await updateDoc(docRef, {
        ...data,
        userId: user.uid,
      });
      showAlert.success("Task successfully updated!");
      fetchTodos();
    } catch (e) {
      console.error("Error updating document: ", e);
      showAlert.error("Something went wrong, please try again");
    }
  };

  const deleteTodo = async (documentId) => {
    try {
      const docRef = doc(db, "todos", documentId);
      await deleteDoc(docRef);
      showAlert.success("Task successfully deleted!");
      fetchTodos();
    } catch (e) {
      console.error("Error adding document: ", e);
      showAlert.error("Something went wrong, please try again");
    }
  };

  const refreshTodoList = () => {
    fetchTodos();
  };

  return {
    todoList: todos,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodoList,
    isLoading: isDataFetching,
  };
};
