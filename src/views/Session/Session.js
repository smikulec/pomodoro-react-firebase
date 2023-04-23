import {
  Button,
  Typography,
  Box,
  Paper,
  InputLabel,
  Divider,
  TextField,
  Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useAlert, useTodosList } from "../../hooks";
import { CounterWizard, Iconify } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Session = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [rounds, setRounds] = useState(4);

  const { showAlert } = useAlert();

  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      taskName: "",
      shortBreakLength: 5,
      longBreakLength: 15,
      pomodoroRounds: 4,
      workSessionLength: 25,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { addTodo } = useTodosList();

  const handleSaveData = async (data) => {
    try {
      const preparedData = {
        taskName: data.taskName,
        rounds: parseInt(rounds, 10),
        sessionLength: parseInt(sessionLength, 10),
        shortBreakLength: parseInt(shortBreakLength, 10),
        longBreakLength: parseInt(longBreakLength, 10),
        totalTime: 0,
        isCompleted: false,
      };

      const docId = await addTodo(preparedData);

      if (docId) {
        showAlert.success("Task successfully created!");
        navigate("/timer", { state: { data: { ...preparedData, id: docId } } });
      }
    } catch (error) {
      showAlert.error(error.message);
    }
  };

  const isPomodoroSetupError =
    errors?.shortBreakLength ||
    errors?.longBreakLength ||
    errors?.workSessionLength ||
    errors?.pomodoroRounds;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSaveData)}>
        <Stack direction="row">
          <Typography variant="h4" sx={{ mb: 5, fontWeight: 700 }}>
            Create New Pomodoro
          </Typography>
          <Tooltip
            placement="right"
            title='The Pomodoro Technique is a time management method that helps you
							break down your work into focused intervals, usually 25 minutes in
							length, followed by a short break. These intervals are called
							"pomodoros". After completing a certain number of work intervals,
							typically four, a longer break of around 15-30 minutes is taken to
							recharge and improve productivity for the next round.'
          >
            <Iconify
              icon="material-symbols:info-outline-rounded"
              sx={{ ml: 1, "&:hover": { cursor: "pointer" } }}
            />
          </Tooltip>
        </Stack>
        <Box maxWidth="sm" sx={{ mb: 6 }}>
          <Typography variant="h6">What would you like to work on?</Typography>
        </Box>
        <Paper
          sx={{
            maxWidth: "450px",
            borderRadius: "28px",
            padding: { xs: "20px", md: "40px" },
          }}
        >
          <InputLabel
            sx={{ color: "primary.contrastText", fontWeight: 600, pb: 1 }}
          >
            Task name
          </InputLabel>
          <TextField
            fullWidth
            name="taskName"
            variant="standard"
            {...register("taskName", {
              required: "You have to enter task name.",
            })}
            error={!!errors?.taskName}
            helperText={errors?.taskName?.message ?? " "}
          />
          <Divider
            sx={{
              width: "100px",
              borderColor: "primary.main",
              borderBottomWidth: "4px",
              mt: 3,
              mb: 4,
            }}
          />
          <Stack>
            <CounterWizard
              title="Work session length"
              time={sessionLength}
              onLengthChange={setSessionLength}
              info="The number of rounds (work intervals) you want to complete before taking a long break."
            />
            <CounterWizard
              title="Pomodoro rounds"
              time={rounds}
              onLengthChange={setRounds}
              info="The length of a single work interval, typically 25 minutes."
            />
            <CounterWizard
              title="Short break length"
              time={shortBreakLength}
              onLengthChange={setShortBreakLength}
              info="The length of the break you take after completing all of the work rounds."
            />
            <CounterWizard
              title="Long break length"
              time={longBreakLength}
              onLengthChange={setLongBreakLength}
              info="The length of the break you take between each work round."
            />
          </Stack>

          {isPomodoroSetupError && (
            <Typography color="error">
              All the values have to be bigger than 0.
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              textTransform: "unset",
              fontWeight: 700,
              mt: 5,
              py: 1.5,
            }}
          >
            Add new pomodoro
          </Button>
        </Paper>
      </form>
    </FormProvider>
  );
};
