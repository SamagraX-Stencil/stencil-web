import * as React from 'react';
import {
  SimpleForm,
  Button,
  LinearProgress,
} from 'react-admin';
import config from './config.js';
import { map, merge } from 'lodash';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ColorPicker } from './colorPicker';
import { ComponentPicker } from './componentPicker';
import { TranslationInput } from "./translationInput";

const BotUICreate = (props: any) => {
  const botName = window?.location?.href?.split('/')?.[window?.location?.href?.split('/')?.length - 1];
  const [state, setState] = React.useState({});
  const [deploymentStatus, setDeploymentStatus] = React.useState();
  const [isLoading,setIsLoading] = React.useState(true);
  const initialValues = config || {};

  const onChange = React.useCallback((event: any, value: any, obj: any) => {
    // console.log({ event, value, obj });
    setState((prev) => {
      const temp = merge(prev, obj);
      console.log(temp);
      return temp;
    });
  }, []);

  const fetchConfig = async () => {
    console.log({botName})
    if(!botName) return {};
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_PWA_DEPLOYER_URL}/deployment/config/${botName}`,
        headers: {
          accept: 'application/json',
        },
      };

      const res = await axios.request(config);
      console.log(res?.data);
      return res?.data?.data?.config;
    } catch (err) {
      console.error(err);
    }
    return {};
  };

  React.useEffect(() => {
    fetchConfig().then((data) => {
     setState(data)
    // setPreviousConfig(data);
     setIsLoading(false);
      console.log("config:", { data } )
    });
  }, []);

  const updateConfig = React.useCallback(async () => {
    const jsonString = JSON.stringify({...state}, null, 2);
    console.log({ jsonString, state });
    try {
      let config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_PWA_DEPLOYER_URL}/deployment/config/${botName}`,
        headers: {
          accept: 'application/json',
        },
        data: {
          config: JSON.parse(jsonString),
        },
      };
      const res = await axios.request(config);
      console.log("res:", res)
      if(!res?.data?.error){
        toast.success('Config Updated')
      }else{
        throw new Error(res?.data?.errorData)
      }
      // checkDeploymentStatus(res?.data?.deployment_id);
    } catch (err: any) {
      toast.error('Could not update config');
      console.error(err);
      return null;
   }
    console.log(state);
    // const link = document.createElement("a");
    // link.href = jsonString;
    // link.download = "sample_data.json";
    // link.click();
  }, [state]);

  return (
    <div>
      <h1>Bot UI Configuration</h1>
      <div>
        <SimpleForm toolbar={false}>
          {isLoading ? <LinearProgress /> : <>
          {map(initialValues, (value: any, key: any) => {
            console.log({ initialValues, value, key })
            return (
              <React.Fragment key={key}>
                {renderFormElement(key, value, onChange, state)}
              </React.Fragment>
            );
          })}
          <TranslationInput setState={setState} state={state}/>
          </>}
         
        </SimpleForm>
        <Button
          variant="contained"
          disabled={!!deploymentStatus}
          label={deploymentStatus ?? 'Update Bot'}
          style={{ width: '35vw' }}
          onClick={updateConfig}
        />
      </div>
      <div
        style={{
          padding: '10px',
        }}>
        {/* Status: {deploymentStatus} */}
      </div>
    </div>
  );
};

const renderFormElement = (key: any, value: any, onChange: any, state: any) => {
  switch (value.componentType) {
    case 'colorpicker':
      return <ColorPicker value={value} onChange={onChange} key={key} state={state} />;
    case 'component':
      return <ComponentPicker value={value} onChange={onChange} key={key} state={state} />;
    default:
      return <></>;
  }
};

export default BotUICreate;