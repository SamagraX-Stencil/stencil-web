import React, { useState } from 'react';
import styles from './index.module.css';
// import Image from 'next/image';
import loginImg from './login.png';

interface LoginPageProps {
  handleOTPPage: (prop: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  handleOTPPage,
}) => {
  const [input, setInput] = useState("");
  const handleNumber: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <div className={`${styles.main}`}>
        <div className={styles.subtitle}>Bot</div>
        <div className={styles.body}>
          <img src={loginImg} alt="" height={201} width={300} />
          <form onSubmit={(event) => event?.preventDefault()}>
            <div className={styles.container}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  pattern="[0-9]*"
                  placeholder="Enter Mobile Number"
                  value={input}
                  onChange={handleNumber}
                />
              </div>
              <button className={styles.submitButton} onClick={() => handleOTPPage(input)}>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
