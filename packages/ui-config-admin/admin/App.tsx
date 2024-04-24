import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { lightTheme } from './components/layout/themes';
import { Layout } from './components/layout';
import { Toaster } from 'react-hot-toast';
import botUIConfig from './resources/botUIConfig';

const App = () => {
  const options = [{
    name: 'allMoleculesApp',
    resource: 'botUIConfig',
    props: botUIConfig
  },
  {
    name: 'bot',
    resource: 'botUIConfig',
    props: botUIConfig
  }];

  return (
    <>
      <Toaster toastOptions={{ style: { fontFamily: 'Roboto' } }} />
      <Admin
        layout={Layout}
        theme={lightTheme}
        defaultTheme="light">
        {options.map((option) => (
          <Resource
            key={option.name}
            name={option.name}
            {...option.props}
          />
        ))}
      </Admin>
      <style>
        {`
          body::-webkit-scrollbar {
          display: none;
          }

          body {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
    </>
  );
};

export default App;
