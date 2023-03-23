import { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export const useTimetracker = () => {
	const [timetrackData, setTimetrackData] = useState({});

	const fetchTimetrackData = useCallback(async () => {
		const todosRef = collection(db, 'timeTracker');
		const timetrackerSnap = await getDocs(todosRef);
		if (timetrackerSnap) {
			setTimetrackData(timetrackerSnap.docs[0]);
		} else {
			console.log('No such document!');
		}
	}, []);

	useEffect(() => {
		fetchTimetrackData();
	}, [fetchTimetrackData]);

	const updateTimetrack = async (data) => {
		const docRef = doc(db, 'timeTracker', 'overallTimetrack');
		try {
			await updateDoc(docRef, data);
		} catch (e) {
			console.error('Error updating document: ', e);
		}
	};

	return {
		updateTimetrack,
		timetrackData,
	};
};
