import {
  Box,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Iconify } from "../Iconify";
import { useFormContext } from "react-hook-form";

function toCamelCase(str) {
  const words = str.split(" ");
  const capitalizedWords = words.map((word, index) => {
    if (index === 0) {
      return word;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  const camelCaseStr = capitalizedWords.join("");
  return camelCaseStr.charAt(0).toLowerCase() + camelCaseStr.slice(1);
}

export const CounterWizard = ({ title, time, onLengthChange, info }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldName = toCamelCase(title);
  const handleButtonClick = (action) => {
    if (action === "increment") {
      onLengthChange((prev) => prev + 1);
    } else if (action === "decrement" && time > 1) {
      onLengthChange((prev) => prev - 1);
    }
  };

  const handleInputChange = (event) => {
    if (!isNaN(event.target.value)) {
      onLengthChange(Number(event.target.value));
    }
  };

  return (
    <>
      <Stack
        sx={{ mb: 3, maxWidth: "360px" }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="subtitle1" fontWeight={700} sx={{ pb: 1, pr: 2 }}>
          {title} {title.includes("rounds") ? "" : "(min)"}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            padding: "6px",
            backgroundColor: "#FFFFFF",
            border: !!errors[fieldName] ? "1px solid red" : "1px solid #CBD5E1",
            borderRadius: "6px",
            width: { xs: "140px", md: "160px" },
            flexShrink: 0,
            flexGrow: 0,
          }}
        >
          <IconButton
            onClick={() => handleButtonClick("decrement")}
            sx={{
              color: "primary.contrastText",
              borderRadius: "6px",
              backgroundColor: "primary.main",
              ":hover": { backgroundColor: "primary.active" },
            }}
          >
            <Iconify icon="mdi:minus" />
          </IconButton>
          <TextField
            name={fieldName}
            value={time}
            variant="standard"
            {...register(`${fieldName}`, {
              required: true,
              validate: (v) => v > 1 || "This is not the right value.",
            })}
            onChange={handleInputChange}
            sx={{ borderBottom: "none" }}
            InputProps={{
              disableUnderline: true,
              sx: {
                px: 1,
                fontWeight: 600,

                "& input": {
                  textAlign: "center",
                  "&::placeholder": {
                    textAlign: "center",
                  },
                },
              },
            }}
            error={errors?.fieldName}
            helperText={errors?.fieldName?.message}
          />
          <IconButton
            onClick={() => handleButtonClick("increment")}
            sx={{
              color: "primary.contrastText",
              borderRadius: "6px",
              backgroundColor: "primary.main",
              ":hover": { backgroundColor: "primary.active" },
            }}
          >
            <Iconify icon="mdi:plus" />
          </IconButton>
        </Stack>
        <Box sx={{ flexGrow: 0, flexShrink: 0 }}>
          <Tooltip title={info} placement="right">
            <Iconify
              icon="material-symbols:info-outline-rounded"
              sx={{ ml: 2, fontSize: "30px", "&:hover": { cursor: "pointer" } }}
              width={25}
            />
          </Tooltip>
        </Box>
      </Stack>
    </>
  );
};
