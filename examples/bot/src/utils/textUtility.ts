export const getInitialMsgs = (t: any, flags: any, locale: any): any => {
  return {
    payload: {
      buttonChoices: [
        {
          key: "1",
          text:
            locale === "en"
              ? flags?.en_example_ques_one?.value ||
                "What are the different types of millets grown in UP?"
              : flags?.hi_example_ques_one?.value ||
                "यूपी में उगाए जाने वाले बाजरा के विभिन्न प्रकार कौन से हैं?",
          img: '/example_image_one.png'
        },
        {
          key: "2",
          text:
            locale === "en"
              ? flags?.en_example_ques_two?.value ||
                "Tell me something about treatment of termites in sugarcane?"
              : flags?.hi_example_ques_two?.value ||
                "गन्ने में दीमक के उपचार के बारे में कुछ बतायें?",
          img: '/example_image_two.png'
        },
        {
          key: "3",
          text:
            locale === "en"
              ? flags?.en_example_ques_three?.value ||
                "How can farmers apply to government schemes in UP?"
              : flags?.hi_example_ques_three?.value ||
                "यूपी में किसान सरकारी योजनाओं के लिए कैसे आवेदन कर सकते हैं?",
          img: '/example_image_three.png'
        },
      ],
    },
    position: "left",
    exampleOptions: true,
  };
};
