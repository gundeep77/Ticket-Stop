import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchVenue(props) {
  const handleChange = (event) => {
    props.searchValue(event.target.value);
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "45ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          autoFocus={true}
          autoComplete="off"
          onChange={handleChange}
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          name="searchQuery"
        />
      </Box>
    </div>
  );
}
