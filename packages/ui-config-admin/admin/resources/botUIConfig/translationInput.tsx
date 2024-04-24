import * as React from 'react';
import {
    Button, FileInput, TextInput,
} from "react-admin";

import { Divider } from "@material-ui/core";

export const TranslationInput = (props: any) =>{
    const [translation,setTranslation] = React.useState({en:{},hi:{},or:{}});
    const [addEnKey,setEnKey] = React.useState("")
    const [addHiKey,setHiKey] = React.useState("")
    const [addOrKey,setOrKey] = React.useState("")
    const [isNewEnKey,setIsNewEnKey] = React.useState(false)
    const [isNewHiKey,setIsNewHiKey] = React.useState(false)
    const [isNewOrKey,setIsNewOrKey] = React.useState(false)

    React.useEffect(()=>{
      if(props.state?.translation) setTranslation(props.state?.translation)
    },[])

    const handleEngFileChange = (file: any) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          try {
              const jsonData = JSON.parse(reader.result as string);
            setTranslation((prev)=>{
              return {...prev,en:jsonData}
            })
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
      }
    };

    const handleHindiFileChange = (file: any) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          try {
              const jsonData = JSON.parse(reader.result as string);
            setTranslation((prev)=>{
              return {...prev,hi:jsonData}
            })
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
      }
    };

    const handleOdiaFileChange = (file: any) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          try {
              const jsonData = JSON.parse(reader.result as string);
            setTranslation((prev)=>{
              return {...prev,or:jsonData}
            })
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
      }
    };

    const handleTranslationClick = () =>{
      console.log(translation)
      props.setState((prev:any)=>{
        // let data={...prev.translation}
        // data= translation
        return {...prev,translation:translation}
      })
    }
  
    return  <div style={{width:"50vw"}}>
              <Divider />
              <h2>Translation</h2>
              <h3>Add English Translation</h3>
              <div> 
                <FileInput
                  source={"enTranslationData"}
                  label="Select JSON File for English"
                  accept="application/json"
                  onChange={handleEngFileChange}
                  sx={{width:"35vw"}}
                >
                  {/* <FileField
                    source="src"
                    title="title"
                  /> */}</FileInput>
              </div>
        {(translation?.en && Object.entries(translation.en).length>0) && <>
          <Button  variant="contained" style={{background:"red", margin:"16px 0"}}
          label={`Delete English Translation`}
          onClick={()=>{setTranslation((prev)=>{
            return {...prev,en:{}}
          })}}></Button>
        {Object.entries(translation.en).map(([key, value])=>{
          return (<div key={key} style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px"}}>
            <label style={{margin:"0"}}>{key}</label>
            <div style={{display:"flex", gap:"16px",alignItems:"center"}}>
              <TextInput
              label={key}
              defaultValue={value}
              source={`en-${key}`}
              onChange={e=>setTranslation((prevState: any) => {
                let data = {...prevState.en};
                data[key] = e.target.value
                return {...prevState,en:data}
              })}  
              style={{width:"30vw"}}                 
              />
              <Button  variant="contained" style={{background:"red"}}
          label={`Delete`}
          onClick={() => setTranslation((prevState: any) => {
            let data = {...prevState.en};
            delete data[key]
            return {...prevState,en:data}
            })}></Button>
          </div></div>)
        })}
        {!isNewEnKey ? <Button  variant="contained" style={{background:"blue",color:"white"}}
          label={`Add New Key`}
          onClick={()=>{setIsNewEnKey(true)}}></Button> :
          <div style={{display:"flex", alignItems:"center",gap:"16px"}}><TextInput
                label={"Key"}
                source='en-key'
                onChange={(e) => setEnKey(e.target.value)}
                defaultValue={addEnKey}
              /><Button  variant="contained" 
              label={`Add`}
              onClick={()=>{setTranslation((prev)=> ({...prev,en:{...prev.en,[addEnKey]:""}}))
              setEnKey("")
              setIsNewEnKey(false)}}></Button></div>}
        </>
          }  

        <h3>Add Hindi Translation</h3>
              <div> 
                <FileInput
                  source={"hiTranslationData"}
                  label="Select JSON File for Hindi"
                  accept="application/json"
                  onChange={handleHindiFileChange}
                  sx={{width:"35vw"}}
                >
                  {/* <FileField
                    source="src"
                    title="title"
                  /> */}
                  </FileInput>
              </div>
        {(translation?.hi && Object.entries(translation.hi).length>0) && <>
          <Button  variant="contained" style={{background:"red",margin:"16px 0"}}
          label={`Delete Hindi Translation`}
          onClick={()=>{setTranslation((prev)=>{
            return {...prev,hi:{}}
          })}}></Button>
        {Object.entries(translation.hi).map(([key, value])=>{
          return (<div key={key} style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px"}}>
            <label style={{margin:"0"}}>{key}</label>
            <div style={{display:"flex", gap:"16px", alignItems:"center"}}>
              <TextInput
              label={key}
              defaultValue={value}
              source={`hi-${key}`}
              onChange={e=>setTranslation((prevState: any) => {
                let data = {...prevState.hi};
                data[key] = e.target.value
                return {...prevState,hi:data}
              })}  
              style={{width:"30vw"}}                 
              />
              <Button  variant="contained" style={{background:"red"}}
          label={`Delete`}
          onClick={() => setTranslation((prevState: any) => {
            let data = {...prevState.hi};
            delete data[key]
            return {...prevState,hi:data}
            })}></Button>
          </div></div>)
        })}
        {!isNewHiKey ? <Button  variant="contained" style={{background:"blue",color:"white"}}
          label={`Add New Key`}
          onClick={()=>{setIsNewHiKey(true)}}></Button> :
          <div style={{display:"flex", alignItems:"center",gap:"16px"}}><TextInput
                label={"Key"}
                source='hi-key'
                onChange={(e) => setHiKey(e.target.value)}
                defaultValue={addHiKey}
              /><Button  variant="contained" 
              label={`Add`}
              onClick={()=>{setTranslation((prev)=> ({...prev,hi:{...prev.hi,[addHiKey]:""}}))
              setHiKey("")
              setIsNewHiKey(false)}}></Button></div>}
        </>
          }  

           <h3>Add Odia Translation</h3>
              <div> 
                <FileInput
                  source={"orTranslationData"}
                  label="Select JSON File for Odia"
                  accept="application/json"
                  onChange={handleOdiaFileChange}
                  sx={{width:"35vw"}}
                >
                  {/* <FileField
                    source="src"
                    title="title"
                  /> */}
                  </FileInput>
              </div>
        {(translation?.or && Object.entries(translation.or).length>0) && <>
          <Button  variant="contained" style={{background:"red",margin:"16px 0"}}
          label={`Delete Odia Translation`}
          onClick={()=>{setTranslation((prev)=>{
            return {...prev,or:{}}
          })}}></Button>
        {Object.entries(translation.or).map(([key, value])=>{
          return (<div key={key} style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px"}}>
            <label style={{margin:"0"}}>{key}</label>
            <div style={{display:"flex", gap:"16px", alignItems:"center"}}>
              <TextInput
              label={key}
              defaultValue={value}
              source={`or-${key}`}
              onChange={e=>setTranslation((prevState: any) => {
                let data = {...prevState.or};
                data[key] = e.target.value
                return {...prevState,or:data}
              })}  
              style={{width:"30vw"}}                 
              />
              <Button  variant="contained" style={{background:"red"}}
          label={`Delete`}
          onClick={() => setTranslation((prevState: any) => {
            let data = {...prevState.or};
            delete data[key]
            return {...prevState,or:data}
            })}></Button>
          </div></div>)
        })}
        {!isNewOrKey ? <Button  variant="contained" style={{background:"blue",color:"white"}}
          label={`Add New Key`}
          onClick={()=>{setIsNewOrKey(true)}}></Button> :
          <div style={{display:"flex", alignItems:"center",gap:"16px"}}><TextInput
                label={"Key"}
                source='or-key'
                onChange={(e) => setOrKey(e.target.value)}
                defaultValue={addOrKey}
              /><Button  variant="contained" 
              label={`Add`}
              onClick={()=>{setTranslation((prev)=> ({...prev,or:{...prev.or,[addOrKey]:""}}))
              setOrKey("")
              setIsNewOrKey(false)}}></Button></div>}
        </>
          }  
       
       
     <div style={{margin: "16px 0"}}><Button  variant="contained"
          label={`Submit Translation`}
          onClick={handleTranslationClick}></Button></div>
    </div>
  }