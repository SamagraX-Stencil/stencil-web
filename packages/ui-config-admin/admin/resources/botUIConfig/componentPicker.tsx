import * as React from 'react';
import {
  TextInput,
  SelectInput,
  FileInput,
  NumberInput,
  BooleanInput,
} from 'react-admin';

import FileFieldWithIcon from '../../components/fileFieldWithIcon';
import { map, merge } from 'lodash';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Divider } from '@material-ui/core';

export const ComponentPicker = ({ value, onChange,state }: any) => {
    const [allowOverride, setAllowOverride] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [componentState, setComponentState] = React.useState({});
  
    React.useEffect(() => {
      setShow(value.isAvailable);
    }, []);
  
    const getFormElement = React.useCallback(
      (option: any, changeHandler: any, value: any) => {
      if(value?.props?.keyName === 'faqs')  console.log("hola2:",{ keyname:option.keyName, defaultValue: option.defaultValue, value,vv:state?.component?.[value?.props?.keyName]?.[option.keyName],state });
        switch (option.componentType) { 
          case 'textInput':
            return (
              <TextInput
                key={`${state?.component?.[value?.props?.keyName]}-${option.keyName}`}
                label={option.componentName}
                defaultValue={state?.component?.[value?.props?.keyName]?.[option.keyName] ?? option.defaultValue}
                source={option.keyName}
                onChange={(e) => changeHandler(e, value)}
                style={{ width: '35vw' }}
              />
            );
          case 'numberInput':
            return (
              <NumberInput
                label={option.componentName}
                defaultValue={state?.component?.[value?.props?.keyName]?.[option.keyName] ?? option.defaultValue}
                source={option.keyName}
                onChange={(e) => changeHandler(e, value)}
              />
            );
          case 'fileInput':
            return (
              <FileInput
                name={option.keyName}
                options={{
                  async onDrop(acceptedFiles, fileRejections, event) {
                    console.log({ acceptedFiles, fileRejections, event });
                    changeHandler(
                      { target: { files: acceptedFiles, name: option.keyName } },
                      value
                    );
                  },
                }}
                source={option.keyName}
                label={option.keyName}
                sx={{ border: '1px dashed grey', padding: '15px' }}
                placeholder="Drop or click to upload files">
                <FileFieldWithIcon
                  source="src"
                  title="title"
                  isImage
                  target="_blank"
                />
              </FileInput>
            );
          case 'booleanInput':
            return (
              <div>
                <label>{option.componentName}</label>
                <BooleanInput
                  defaultValue={option.defaultValue}
                  source={option.keyName}
                  onChange={(e) => changeHandler(e, value)}
                />
              </div>
            );
          case 'select':
            return (
              <div>
                <SelectInput
                  variant="outlined"
                  source={option.keyName}
                  label={option.componentName}
                  choices={option.options.map((option: any, key: any) => ({
                    id: key,
                    name: option,
                  }))}
                  defaultValue={option.defaultValue}
                  fullWidth
                  required
                  onChange={(e) => changeHandler(e, value)}
                />
              </div>
            );
          default:
            return null;
        }
      },
      [state]
    );
  
    const handleFileUpload = async (file: File) => {
      const data = new FormData();
      data.append('file', file);
      try {
        let config = {
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_PWA_DEPLOYER_URL}/files/upload-file?destination=uploads&filename=${file.name}`,
          data: data,
        };
        const res = await axios.request(config);
        if (res?.data?.file?.url) return res?.data?.file?.url;
        else {
          toast.error('Could not get image link');
          return null;
        }
      } catch (err: any) {
        toast.error(err);
        return null;
      }
    };
  
    const changeHandler = async (event: any, value: any) => {
      console.log({ event });
      if (event.target.files) {
        const res = await handleFileUpload(event.target.files[0]);
        setComponentState((prev) => ({
          ...componentState,
          allowOverride: allowOverride,
          [event.target.name]: res,
        }));
        onChange(null, null, {
          [value.componentType]: {
            [value.props.keyName]: {
              ...componentState,
              allowOverride: allowOverride,
              [event.target.name]: res,
            },
          },
        });
      } else if (event.target.type === "checkbox") {
        setComponentState((prev) => ({
          ...componentState,
          allowOverride: allowOverride,
          [event.target.name]: event.target.checked,
        }));
        // console.log( {name: event.target.name, v: event.target.checked})
        onChange(null, null, {
          [value.componentType]: {
            [value.props.keyName]: {
              ...componentState,
              allowOverride: allowOverride,
              [event.target.name]: event.target.checked,
            },
          },
        });
      } else {
        setComponentState((prev) => ({
          ...componentState,
          allowOverride: allowOverride,
          [event.target.name]: event.target.value,
        }));
        // console.log( {name: event.target.name, v: event.target.value})
        onChange(null, null, {
          [value.componentType]: {
            [value.props.keyName]: {
              ...componentState,
              allowOverride: allowOverride,
              [event.target.name]: event.target.value,
            },
          },
        });
      }
    };
  
    return (
      <div style={{ maxWidth: '50vw', overflow: 'hidden' }}>
        <Divider />
        <h2 style={{ display: 'flex', justifyContent: 'space-between' }}>
          {value.componentName}
          {/* <BooleanInput
            defaultValue={value.isAvailable}
            source={'show'}
            onChange={(e) => setShow(!show)}
          />{' '} */}
        </h2>
  
        {/* <div>
          <label htmlFor="checkbox">Allow Override</label>
          <input
            type="checkbox"
            defaultChecked={value.defaultValue}
            name="checkbox"
            onChange={() => setAllowOverride(!allowOverride)}
          />
        </div> */}
        {/* <div>
          <label htmlFor="checkbox">Show</label>
          <input
            type="checkbox"
            defaultChecked={value.isAvailable}
            name="checkbox"
            onChange={() => setShow(!show)}
          />
        </div> */}
  
        {map(value.props.children, (option: any, key: any) => {
          return <div key={key}>{getFormElement(option, changeHandler, value)}</div>;
        })}
      </div>
    );
  };