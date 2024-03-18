import { Box, Container, IconButton } from "@mui/material";
import { OTPInput } from "../molecules/otp-input";
import { List } from "../molecules/list";
import { useMemo } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useColorPalates } from "../molecules/theme-provider/hooks";
 
 
import Navbar from "../molecules/Navbar/index";
 
 
 


 
const Components = () => {
  const theme = useColorPalates();
  const sampleList = useMemo(
    () => [
      {
        id: "item1",
        label: "Item 1",
        secondaryLabel: "Description of Item 1",
        icon: <ForumIcon style={{ color: theme?.primary?.light }} />,

        items: [
          {
            id: "subitem1-1",
            label: "Subitem 1-1",
          },
          {
            id: "subitem1-2",
            label: "Subitem 1-2",
            isDivider: true,
          },
        ],
        onClick: "functionNameForItem1",
        isDivider: false,
      },
      {
        id: "item2",
        label: "Item 2",
        avatar: "https://rb.gy/u1ufa2",
        isDivider: true,
        secondaryAction: (
          <IconButton edge="end" aria-label="comments">
            <DeleteOutlineIcon />
          </IconButton>
        ),
      },

      {
        id: "item3",
        label: "Item 3",
        secondaryLabel: "Description of Item 3",
        avatar: "https://rb.gy/u1ufa2",
        items: [
          {
            id: "subitem3-1",
            label: "Subitem 3-1",
          },
        ],
      },
    ],
    [theme?.primary?.light]
  );
  return (
 
    <Box
      minHeight="95vh" // Full viewport height
      style={{ background: "lightgray" }}
      className="bg-light"
    >
      <Container>
        <h4>OTP Input</h4>
        <div className="mt-2 p-5 border">
          <OTPInput separator="-" length={4} value="" onChange={() => null} />
        </div>
      </Container>

      <Container>
        <h4>List</h4>
        <div className="mt-2 p-5 border">
      
        {  
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
          <List items={sampleList} />}
        </div>
      </Container>
 
 
 
      <Container>
           <h4>Navbar</h4>
          <Navbar />
        </Container>
 
    </Box>
 
 
 
  );
};

export default Components;
