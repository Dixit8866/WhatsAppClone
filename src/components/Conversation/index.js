import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Stack,
  Badge,
  Typography,
  IconButton,
  Divider,
  TextField,
  Fab,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Camera,
  CaretDown,
  File,
  Image,
  LinkSimple,
  MagnifyingGlass,
  PaperPlaneTilt,
  Phone,
  Sticker,
  User,
  VideoCamera,
} from "phosphor-react";
import Message from "./Message";
import { useState } from "react";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

function Conversation() {
  const [openActions, setOpenActions] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <>
      <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
        {/* Chat Header */}
        <Box
          p={2}
          height={80}
          width={"100%"}
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.default,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack
            alignItems={"center"}
            direction="row"
            justifyContent={"space-between"}
            sx={{ width: "100%", height: "100%" }}
          >
            <Stack
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
              direction={"row"}
              spacing={2}
              sx={{ cursor: "pointer" }}
            >
              <Box>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={faker.name.fullName()}
                    src={faker.image.avatar()}
                  />
                </StyledBadge>
              </Box>
              <Stack spacing={0.2}>
                <Typography>{faker.name.fullName()}</Typography>
                <Typography variant="caption">Online</Typography>
              </Stack>
            </Stack>

            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <IconButton>
                <Phone />
              </IconButton>
              <IconButton>
                <MagnifyingGlass />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <IconButton>
                <CaretDown />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Message Box */}
        <Box
          width={"100%"}
          sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}
        >
          <Message menu={true} />
        </Box>

        {/* Chat Footer */}
        <Box
          p={1.5}
          height={70}
          width={"100%"}
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.default,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Stack sx={{ width: "max-content" }}>
              <Stack
                sx={{
                  position: "relative",
                  display: openActions ? "inline-block" : "none",
                }}
              >
                {Actions.map((el) => (
                  <Tooltip placement="right" title={el.title}>
                    <Fab
                      sx={{
                        position: "absolute",
                        top: -el.y,
                        backgroundColor: el.color,
                      }}
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                ))}
              </Stack>
              <IconButton
                onClick={() => {
                  setOpenActions(!openActions);
                }}
              >
                <LinkSimple />
              </IconButton>
            </Stack>

            <StyledInput
              fullWidth
              placeholder="Write a Message..."
              variant="filled"
            />
            <Box
              sx={{
                height: 48,
                width: 48,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 1.5,
              }}
            >
              <Stack
                sx={{ height: "100%", width: "100%" }}
                alignItems="center"
                justifyContent="center"
              >
                <IconButton>
                  <PaperPlaneTilt color="#fff" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default Conversation;
