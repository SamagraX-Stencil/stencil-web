import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

export const InputField = ({
  label,
  defaultValue,
  onChange,
}: {
  label: string
  defaultValue: string
  onChange: (value: string) => void
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  return (
    <TextField
      sx={{ width: 300 }}
      label={label}
      id="outlined-size-small"
      defaultValue={defaultValue}
      size="small"
      onChange={handleChange}
    />
  )
}

export const PageTitle = ({ title }: { title: string }) => {
  return (
    <Typography variant="body2" fontWeight="bold">
      {title}
    </Typography>
  )
}

export const CheckBoxOption = ({
  selectedValue,
  title,
  onChange,
}: {
  selectedValue: boolean
  title: string
  onChange: (value: boolean) => void
}) => {
  return (
    <div>
      <Typography variant="body2" gutterBottom>
        {title}:
      </Typography>
      <RadioGroup
        name="custom-radio-group"
        value={selectedValue ? 'true' : 'false'}
        onChange={(e) => {
          const newValue = e.target.value === 'true'
          onChange(newValue)
        }}
        sx={{ display: 'flex', flexDirection: 'row', width: '300px' }}
      >
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
    </div>
  )
}
