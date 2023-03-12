import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
	const [matches, setMatches] = useState(false);
	useEffect(() => {
		const matchQueryList = window.matchMedia(query);

		matchQueryList.matches ? setMatches(true) : setMatches(false);

		function handleChange(e) {
			setMatches(e.matches);
		}
		matchQueryList.addEventListener('change', handleChange);

		return () => {
			matchQueryList.removeEventListener('change', handleChange);
		};
	}, [query]);
	return matches;
};
