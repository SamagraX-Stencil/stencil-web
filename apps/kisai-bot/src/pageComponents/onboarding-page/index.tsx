import { useEffect, useState } from 'react';
import OnBoarding from '../../components/onboarding';
import UserTypeSelector from '../../components/user-type-selector';
import OptionSelector from '../../components/option-selector';
import LocationInput from '../../components/location-input';
import axios from 'axios';
import Head from 'next/head';
import { useLocalization } from '../../hooks';
import { useConfig } from '../../hooks/useConfig';
const OnBoardingPage = (props: any) => {
  const t = useLocalization();
  const config = useConfig('component', 'botDetails');
  const [activeStep, setActiveStep] = useState(0);
  const [steps] = useState(4);
  const [onboardingData, setOnboardingData] = useState<any>({});
  const [cropList, setCropList] = useState<any>(null);
  const [animalList, setAnimalList] = useState<any>(null);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const fetchList = async (type: string) => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_DATASET_URL +
          '/dataset/execute/' +
          process.env.NEXT_PUBLIC_ENTITY_DATASET_ID,
        {
          sqlQuery: `SELECT * from "prioritized_commodity" where "type"='${type}' and "datasetId" = '${process.env.NEXT_PUBLIC_ENTITY_DATASET_ID}' and "botId"='${process.env.NEXT_PUBLIC_BOT_ID}' ORDER BY "priority"`,
        },
        {
          headers: {
            botId: process.env.NEXT_PUBLIC_BOT_ID || '',
            orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          },
        }
      );
      console.log({ res });
      if (type === 'crop') {
        setCropList(res?.data?.data);
      } else if (type === 'animal') {
        setAnimalList(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList('crop');
    fetchList('animal');
  }, []);

  const updateUser = async () => {
    try {
      const userID = localStorage.getItem('userID');
      const res = await axios.put(`/api/updateUser?userID=${userID}`, {
        onboardingData,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(activeStep);
    if (activeStep === steps) {
      props?.setUser((prevUser: any) => ({
        ...prevUser,
        data: {
          ...prevUser.data,
          profile: { ...onboardingData },
        },
      }));
      updateUser();
    }
  }, [activeStep]);

  useEffect(() => {
    console.log(onboardingData);
  }, [onboardingData]);

  return (
    <div>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>

      <OnBoarding
        containerStyle={{ width: '100%' }}
        variant="dots"
        activeStep={activeStep}
        steps={steps}
      >
        {activeStep === 0 && (
          <UserTypeSelector handleNext={handleNext} setOnboardingData={setOnboardingData} />
        )}
        {activeStep === 1 && (
          <LocationInput
            handleNext={handleNext}
            handleBack={handleBack}
            setOnboardingData={setOnboardingData}
          />
        )}
        {activeStep === 2 && (
          <OptionSelector
            handleNext={handleNext}
            handleBack={handleBack}
            setOnboardingData={setOnboardingData}
            commodityType="crops"
            commodityList={cropList}
          />
        )}
        {activeStep === 3 && (
          <OptionSelector
            handleNext={handleNext}
            handleBack={handleBack}
            setOnboardingData={setOnboardingData}
            commodityType="animals"
            commodityList={animalList}
          />
        )}
      </OnBoarding>
    </div>
  );
};

export default OnBoardingPage;
