import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * A component that displays a group of checkboxes with associated labels.
 *
 * @component
 * @returns {JSX.Element} The rendered Labels component.
 */
export default function Labels() {
  return (
    <FormGroup
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: '24px',
      }}
    >
      <FormControlLabel
        control={<Checkbox />}
        label="Label 1"
        sx={{ userSelect: 'none' }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Label 2"
        sx={{ userSelect: 'none' }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Label 3"
        sx={{ userSelect: 'none' }}
      />
    </FormGroup>
  );
}
