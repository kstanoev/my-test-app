import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Autocomplete, Fab, FormControlLabel, Switch } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers';

const options = ['No repeat', 'Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'];
const invitees = [
  { email: "pesho@gmail.com" },
  { email: "gosho@gmail.com" },
];

export default function CreateEventDialog() {
  const [open, setOpen] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab
        size="small"
        color="grey"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          display: { xs: 'none', md: 'flex' },
          ml: '17vw',
        }}
      >
        <AddIcon color="primary" />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            id="standard-multiline-flexible"
            label="Description (optional)"
            multiline
            fullWidth
            maxRows={10}
            variant="standard"
            sx={{ mt: 1 }}

          />
          <DateField
            variant="standard"
            required
            label="Start date"
            sx={{ mt: 2 }}
          />
          {!allDay &&
            <TimeField
              variant="standard"
              label="Start time"
              sx={{ mt: 2 }}
            />
          }
          <br />
          <FormControlLabel
            control={
              <Switch onChange={() => setAllDay(!allDay)} name="All day" />
            }
            label="All day"
            sx={{ mt: 2 }}
          />
          <br />
          <DateField
            variant="standard"
            label="End date"
          />
          {!allDay &&
            <TimeField
              variant="standard"
              label="End time"
            />
          }
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            size="small"
            options={options}
            renderInput={(params) => <TextField {...params} label="Repeat" variant="standard" />}
            sx={{ mt: 4 }}
          />
          <Autocomplete
            multiple
            sx={{ mt: 2 }}
            id="tags-standard"
            options={invitees}
            getOptionLabel={(option) => option.email}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Invitees"
                placeholder="Enter email"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}