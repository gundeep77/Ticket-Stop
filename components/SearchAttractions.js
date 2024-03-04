import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchAttractions(props) {
  const handleChange = (event) => {
    let value = event.target.value;
    props.searchValue(value);
  };
  return (
    <form method="POST" name="SearchForm">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "45ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          autoFocus="autofocus"
          autoComplete="off"
          onChange={handleChange}
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          name="searchQuery"
        />
      </Box>
    </form>
  );
}
