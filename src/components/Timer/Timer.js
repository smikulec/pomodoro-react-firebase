import { Stack, CircularProgress, Button, Typography } from '@mui/material';
import { NavBar } from '../NavBar';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import styles from './Timer.module.scss';

const Circle = styled(CircularProgress)({
	position: 'absolute',
});

const TimeCounter = ({
	time,
	onReset,
	progress,
	isActive,
	toggleActive,
	sessionRoundsProgress,
	onNext,
}) => {
	const min = Math.floor(time / 1000 / 60);
	const sec = Math.floor((time / 1000) % 60);

	return (
		<div className={styles.timerCounter}>
			<div className={styles.circleContainer}>
				<Circle
					size='22rem'
					variant='determinate'
					value={100}
					color='secondary'
				/>
				<Circle
					size='22rem'
					variant='determinate'
					value={progress}
					color='primary'
				/>
				<div className={styles.timeCounter}>
					{min}:{sec.toString().length === 1 ? '0' + sec : sec}
				</div>
			</div>
			<Stack direction='row' className={styles.buttonGroup}>
				<Button onClick={onReset}>restart</Button>
				<Button onClick={() => toggleActive((current) => !current)}>
					{isActive ? 'stop' : 'start'}
				</Button>
				<Button onClick={onNext}>next</Button>
			</Stack>
			<Typography variant='p'>{sessionRoundsProgress}</Typography>
		</div>
	);
};

export const Timer = () => {
	const [isActive, setIsActive] = useState(false);
	const [timeSpent, setTimeSpent] = useState(0);
	const [mode, setMode] = useState('session');
	const [sessionCounter, setSessionCounter] = useState(1);

	const state = {
		sessionLength: 0.5 * 60,
		shortBreakLength: 0.25 * 60,
		longBreakLength: 1 * 60,
		sessionNumber: 4,
	};

	const isLongBreakTime = sessionCounter === state.sessionNumber;

	const timeLeft =
		(mode === 'session'
			? state.sessionLength
			: isLongBreakTime
			? state.longBreakLength
			: state.shortBreakLength) *
			1000 -
		timeSpent;

	useEffect(() => {
		let interval = null;

		if (isActive && timeLeft > 1) {
			interval = setInterval(() => {
				setTimeSpent((timeSpent) => timeSpent + 1000);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		if (timeLeft === 0) {
			setTimeSpent(0);
			setMode((mode) => (mode === 'session' ? 'break' : 'session'));
			if (sessionCounter < state.sessionNumber) {
				setSessionCounter((prevCount) =>
					mode === 'break' ? prevCount + 1 : prevCount
				);
			}
			if (sessionCounter === state.sessionNumber) {
				setIsActive(false);
			}
		}

		return () => clearInterval(interval);
	}, [
		isActive,
		mode,
		timeSpent,
		timeLeft,
		sessionCounter,
		state.sessionNumber,
	]);

	const handleReset = () => {
		setTimeSpent(0);
	};

	const progress =
		mode === 'session'
			? Math.round((timeLeft / 1000 / state.sessionLength) * 100)
			: isLongBreakTime
			? Math.round((timeLeft / 1000 / state.longBreakLength) * 100)
			: Math.round((timeLeft / 1000 / state.shortBreakLength) * 100);

	return (
		<>
			<NavBar />
			<main className={styles.main}>
				<div className={styles.timerWrapper}>
					<Typography textAlign='center' variant='h1' className={styles.title}>
						Let's get to business!
					</Typography>
					<Typography textAlign='center' variant='h5' className={styles.title}>
						Big chunky task name
					</Typography>
					<Typography
						textAlign='center'
						variant='h6'
						className={styles.subtitle}>
						{mode === 'session'
							? 'Time to focus'
							: isLongBreakTime
							? 'Go have a nice long break, you deserved it!'
							: 'Time to have a break, go stretch and move your bodeee'}
					</Typography>
					<TimeCounter
						isActive={isActive}
						toggleActive={setIsActive}
						progress={progress}
						time={timeLeft}
						onReset={handleReset}
						sessionRoundsProgress={`${sessionCounter} / ${state.sessionNumber}`}
						onNext={() => {
							if (sessionCounter < state.sessionNumber) {
								setSessionCounter((prev) => prev + 1);
							}
						}}
					/>
				</div>
			</main>
		</>
	);
};
