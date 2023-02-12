import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';

export const useTodosList = () => {
	const [user, loading] = useAuthState(auth);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		if (loading) return;
		if (!user) {
			console.log('there was an error');
		}
		const fetchTodos = async () => {
			const todosRef = collection(db, 'todos');
			const todosSnap = await getDocs(todosRef);
			if (todosSnap) {
				todosSnap.docs.forEach((doc) => {
					if (doc.data().userId === user.uid) {
						setTodos((prev) => [...prev, { ...doc.data(), id: doc.id }]);
					}
					console.log('doc data', doc.data(), 'id', doc.id);
				});
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		};

		fetchTodos();
	}, [loading, user]);

	const addTodo = async (data) => {
		try {
			const docRef = await addDoc(collection(db, 'todos'), {
				...data,
				userId: user.uid,
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const updateTodo = async (data) => {
		const documentId = data.id;
		delete data.id;
		const docRef = doc(db, 'todos', documentId);
		try {
			const response = await updateDoc(docRef, {
				...data,
				userId: user.uid,
			});
			console.log('response after update', response);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const deleteTodo = async (documentId) => {
		const docRef = doc(db, 'todos', documentId);
		try {
			await deleteDoc(docRef);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	return {
		todoList: todos,
		addTodo,
		updateTodo,
		deleteTodo,
	};
};
