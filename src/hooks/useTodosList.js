import { useCallback, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useTodosList = () => {
	const [todos, setTodos] = useState([]);
	const [wholeTodos, setWholeTodos] = useState();
	const [user] = useAuthState(auth);
	const [isDataChanged, setIsDataChanged] = useState(false);

	const fetchTodos = useCallback(async () => {
		const todosRef = collection(db, 'todos');
		const todosSnap = await getDocs(todosRef);
		if (todosSnap) {
			setWholeTodos(todosSnap.docs);
		} else {
			// doc.data() will be undefined in this case
			console.log('No such document!');
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
			const docRef = await addDoc(collection(db, 'todos'), {
				...data,
				userId: user?.uid,
				createdAt: new Date().toISOString(),
			});
			fetchTodos();
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const updateTodo = async (data) => {
		setIsDataChanged(false);
		const documentId = data.id;
		delete data.id;
		const docRef = doc(db, 'todos', documentId);
		try {
			await updateDoc(docRef, {
				...data,
				userId: user.uid,
			});
			fetchTodos();
		} catch (e) {
			console.error('Error updating document: ', e);
		}
	};

	const deleteTodo = async (documentId) => {
		const docRef = doc(db, 'todos', documentId);
		try {
			await deleteDoc(docRef);
			fetchTodos();
		} catch (e) {
			console.error('Error adding document: ', e);
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
	};
};
