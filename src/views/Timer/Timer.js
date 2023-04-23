import {
  Stack,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSessionData, useTimetracker, useTodosList } from "../../hooks";
import { Iconify } from "../../components";

import styles from "./Timer.module.scss";

const Circle = styled(CircularProgress)({
  position: "absolute",
});

const TimeCounter = ({
  time,
  onReset,
  progress,
  isActive,
  onToggleActive,
  sessionRoundsProgress,
  onNext,
}) => {
  const min = Math.floor(time / 1000 / 60);
  const sec = Math.floor((time / 1000) % 60);

  return (
    <div className={styles.timerCounter}>
      <div className={styles.circleContainer}>
        <Circle
          size="22rem"
          variant="determinate"
          value={100}
          // sx={{ color: 'primary.contrastText' }}
          color="primary"
        />
        <Circle
          size="22rem"
          variant="determinate"
          value={progress}
          // color='primary'
          sx={{ color: "primary.contrastText" }}
        />
        <div className={styles.timeCounter}>
          {min}:{sec.toString().length === 1 ? "0" + sec : sec}
        </div>
      </div>
      <Stack
        direction="column"
        alignItems="center"
        sx={{ mt: 1, color: "primary" }}
      >
        <Box>
          <Tooltip title="Reset session">
            <IconButton onClick={onReset} sx={{ mt: 2 }}>
              <Iconify
                icon="material-symbols:restart-alt-rounded"
                width={40}
                height={40}
                color="primary.contrastText"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title={isActive ? "Pause session" : "Start session"}>
            <IconButton onClick={onToggleActive} sx={{ mt: 2 }}>
              {isActive ? (
                <Iconify
                  icon="material-symbols:pause-circle-outline-rounded"
                  width={40}
                  height={40}
                  color="primary.contrastText"
                />
              ) : (
                <Iconify
                  icon="material-symbols:play-circle-outline-rounded"
                  width={40}
                  height={40}
                  color="primary.contrastText"
                />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to the next session">
            <IconButton onClick={onNext} sx={{ mt: 2 }}>
              <Iconify
                icon="material-symbols:next-plan-outline-rounded"
                width={40}
                height={40}
                color="primary.contrastText"
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography fontWeight={600} fontSize="20px" sx={{ mt: 1 }}>
            {sessionRoundsProgress}
          </Typography>
          <Typography fontWeight={600} fontSize="20px" sx={{ mt: 1 }}>
            rounds
          </Typography>
        </Box>
      </Stack>
    </div>
  );
};

const initialData = {
  sessionLength: 0.5 * 60,
  shortBreakLength: 0.25 * 60,
  longBreakLength: 1 * 60,
  rounds: 4,
};

export const Timer = () => {
  const { state } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [mode, setMode] = useState("session");
  const [sessionCounter, setSessionCounter] = useState(1);
  const { updateTodo } = useTodosList();
  const { updateTimetrack, timetrackData } = useTimetracker();
  const { todaysSession, addSession, updateSession } = useSessionData();

  const taskData = state ? state.data : initialData;

  const isLongBreakTime = sessionCounter === taskData.rounds;

  const timeLeft =
    (mode === "session"
      ? taskData.sessionLength * 60
      : isLongBreakTime
      ? taskData.longBreakLength * 60
      : taskData.shortBreakLength * 60) *
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

      if (mode === "session") {
        const data = {
          ...taskData,
          totalTime: taskData.totalTime + taskData.sessionLength,
          lastUpdated: new Date().toISOString(),
        };
        updateTodo(data);

        const updatedTimetrackData = {
          totalTime: timetrackData.totalTime + taskData.sessionLength,
          lastUpdated: new Date().toISOString(),
        };
        updateTimetrack(updatedTimetrackData);

        if (todaysSession) {
          updateSession({
            ...todaysSession,
            endTime: new Date().toISOString(),
            totalTime: todaysSession.totalTime + taskData.sessionLength,
          });
        }
      }
      if (sessionCounter < taskData.rounds) {
        setSessionCounter((prevCount) =>
          mode === "break" ? prevCount + 1 : prevCount
        );
      }
      if (sessionCounter === taskData.rounds) {
        setIsActive(false);
      }

      setMode((mode) => (mode === "session" ? "break" : "session"));
    }

    return () => clearInterval(interval);
  }, [
    isActive,
    mode,
    timeSpent,
    timeLeft,
    sessionCounter,
    taskData,
    updateTodo,
    timetrackData.totalTime,
    updateTimetrack,
    updateSession,
    todaysSession,
    addSession,
  ]);

  const handleReset = () => {
    setTimeSpent(0);
    setSessionCounter(1);
  };

  const handleToggle = () => {
    setIsActive((current) => !current);

    if (mode === "session" && sessionCounter === 1 && !todaysSession) {
      addSession({
        startTime: new Date().toISOString(),
        endTime: null,
        totalTime: 0,
      });
    }
  };

  const progress =
    mode === "session"
      ? Math.round((timeLeft / 1000 / taskData.sessionLength / 60) * 100)
      : isLongBreakTime
      ? Math.round((timeLeft / 1000 / taskData.longBreakLength / 60) * 100)
      : Math.round((timeLeft / 1000 / taskData.shortBreakLength / 60) * 100);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Let's get down to business!
      </Typography>
      <Box>
        <Typography variant="h5" color="text.primary" sx={{ mb: 3 }}>
          {taskData.taskName}
        </Typography>
        <Box
          sx={{
            width: "fit-content",
            margin: { xs: "auto", lg: 0 },
            pl: { lg: "20%" },
          }}
        >
          <Typography textAlign="center" variant="h6" fontWeight={600}>
            {mode === "session"
              ? "Time to focus!"
              : isLongBreakTime
              ? "Go have a nice long break, you deserved it!"
              : "Time to have a break, go stretch and move your bodeee"}
          </Typography>
          <TimeCounter
            isActive={isActive}
            onToggleActive={handleToggle}
            progress={progress}
            time={timeLeft}
            onReset={handleReset}
            sessionRoundsProgress={`${sessionCounter} / ${taskData.rounds}`}
            onNext={() => {
              if (sessionCounter < taskData.rounds) {
                setSessionCounter((prev) => prev + 1);
              }
            }}
          />
        </Box>
      </Box>
    </>
  );
};
