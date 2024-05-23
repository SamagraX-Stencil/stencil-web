import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

export const InputField = ({
  label,
  defaultValue,
  onChange,
}: {
  label: string
  defaultValue: string
  onChange: (value: string) => void
}) => {
  const [text, setText] = useState(defaultValue)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    // onChange(event.target.value)
  }
  const handleBlur = () => {
    onChange(text)
  }

  return (
    <TextField
      sx={{ width: 300 }}
      label={label}
      id="outlined-size-small"
      defaultValue={text}
      size="small"
      onChange={handleChange}
      onBlur={handleBlur}
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

export const InputNumberField = ({
  label,
  defaultValue,
  onChange,
  isNegative = false,
}: {
  label: string
  defaultValue: number
  onChange: (value: number) => void
  isNegative?: boolean
}) => {
  const storeDefaultValue = defaultValue
  const [num, setNum] = useState<number | string>(defaultValue)

  // const isNumeric = (value: string): boolean => {
  //   if (isNegative) {
  //     return /^-?\d+$/.test(value)
  //   } else {
  //     return /^\d+$/.test(value)
  //   }
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const numericValue =
      inputValue.match(isNegative ? /^-?\d*/ : /^\d*/)?.[0] || ''
    setNum(numericValue)
  }

  const handleBlur = () => {
    if (num === '' || num === '-') {
      setNum(storeDefaultValue)
      onChange(storeDefaultValue)
    } else {
      onChange(parseInt(num.toString()))
    }
  }

  return (
    <TextField
      sx={{ width: 300 }}
      label={label}
      id="outlined-size-small"
      defaultValue={defaultValue}
      size="small"
      onChange={handleChange}
      type="text"
      required
      fullWidth
      value={num}
      onBlur={handleBlur}
    />
  )
}
