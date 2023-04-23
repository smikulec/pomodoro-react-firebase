import { Modal, useModalDialog } from "../Modal";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { CounterWizard } from "../CounterWizard";
import { useState } from "react";
import { useTodosList } from "../../hooks/useTodosList";
import { registerModalDialog } from "../Modal/modalRegistration";
import { FormProvider, useForm } from "react-hook-form";

export const EditTaskModal = registerModalDialog(
  ({ taskData, onDataChange }) => {
    const [sessionLength, setSessionLength] = useState(taskData.sessionLength);
    const [shortBreakLength, setShortBreakLength] = useState(
      taskData.shortBreakLength
    );
    const [longBreakLength, setLongBreakLength] = useState(
      taskData.longBreakLength
    );
    const [rounds, setRounds] = useState(taskData.rounds);

    const methods = useForm({ defaultValues: taskData });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = methods;

    const editTaskModalHandler = useModalDialog();

    const { updateTodo } = useTodosList();

    const handleSaveChanges = (data) => {
      const preparedData = {
        id: data.id,
        taskName: data.taskName,
        rounds: parseInt(rounds, 10),
        sessionLength: parseInt(sessionLength, 10),
        shortBreakLength: parseInt(shortBreakLength, 10),
        longBreakLength: parseInt(longBreakLength, 10),
        totalTime: 0,
        isCompleted: false,
      };
      updateTodo(preparedData);
      onDataChange();
      editTaskModalHandler.destroyModal();
    };

    const handleCancelChanges = () => {
      editTaskModalHandler.destroyModal();
    };

    const isPomodoroSetupError =
      errors?.shortBreakLength ||
      errors?.longBreakLength ||
      errors?.workSessionLength ||
      errors?.pomodoroRounds;

    return (
      <FormProvider {...methods}>
        <Modal
          title={taskData?.taskName}
          isOpen={editTaskModalHandler.isModalVisible}
          onClose={editTaskModalHandler.destroyModal}
        >
          <form onSubmit={handleSubmit(handleSaveChanges)}>
            <Modal.Content>
              <InputLabel
                sx={{ color: "primary.contrastText", fontWeight: 700, pb: 1 }}
              >
                Change task name
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
                sx={{ mb: 2 }}
              />

              <CounterWizard
                title="Work session length"
                time={sessionLength}
                onLengthChange={setSessionLength}
              />
              <CounterWizard
                title="Pomodoro rounds"
                time={rounds}
                onLengthChange={setRounds}
              />
              <CounterWizard
                title="Short break length"
                time={shortBreakLength}
                onLengthChange={setShortBreakLength}
              />
              <CounterWizard
                title="Long break length"
                time={longBreakLength}
                onLengthChange={setLongBreakLength}
              />

              {isPomodoroSetupError && (
                <Typography variant="subtitle1" color="error" sx={{ mb: 3 }}>
                  All the values have to be bigger than 0.
                </Typography>
              )}
            </Modal.Content>
            <Modal.Footer>
              <Button
                variant="contained"
                onClick={handleCancelChanges}
                sx={{
                  textTransform: "unset",
                  fontWeight: 700,

                  ":hover": { color: "#FFFFFF" },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  textTransform: "unset",
                  fontWeight: 700,
                }}
              >
                Save changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </FormProvider>
    );
  }
);
