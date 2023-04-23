import { Card, Typography } from "@mui/material";
import { Iconify } from "../Iconify";
import { styled } from "@mui/material/styles";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

export const StatCard = ({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}) => {
  return (
    <Card
      sx={{
        py: 3,
        mx: 3,
        textAlign: "center",
        bgcolor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "28px",
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: "secondary.main",
          backgroundColor: "neutral.main",
          mb: 1,
        }}
      >
        <Iconify icon={icon} width={30} height={30} />
      </StyledIcon>

      <Typography variant="h4" fontWeight={600}>
        {total}
      </Typography>

      <Typography variant="body1" fontWeight={600}>
        min
      </Typography>

      <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
        {title}
      </Typography>
    </Card>
  );
};
