import * as React from 'react';

export const ColorPicker = ({ value, onChange,state }: any) => {

    const [color, setColor] = React.useState('');
    
    React.useEffect(() => {
      setColor(state?.theme?.palette?.primary?.[value?.props?.keyName] ?? '');
    }, [state?.theme?.palette?.primary?.[value?.props?.keyName]]);
  
   
    const handleChange = (e: any) => {
      setColor(e.target.value);
      const obj = {
        theme: {
          palette: {
            [value.category]: {
              [value.props.keyName]: e.target.value,
            },
          },
        },
      };
      onChange(e, value, obj);
    };
  
    return (
      <div>
        <label>{value.componentName}</label>
        {/* <input
          type="checkbox"
          defaultChecked={allowOverride}
          onChange={() => setAllowOverride(!allowOverride)}
        /> */}
        <input
          type="color"
          value={color}
          name={value.props.keyName}
          onChange={handleChange}
          style={{ margin: '5px' }}
        />
      </div>
    );
  };