export const getInitialMsgs = (t: any, flags: any, locale: any): any => {
  return {
    payload: {
      buttonChoices: [
        {
          key: "1",
          text:
            locale === "en"
              ? flags?.en_example_ques_one?.value ||
                "What are the different types of millets grown in Odisha?"
              : flags?.or_example_ques_one?.value ||
                "ଓଡ଼ିଶାରେ ଉତ୍ପାଦନ ହେଉଥିବା ବିଭିନ୍ନ ପ୍ରକାର ମିଲେଟ୍ ଗୁଡିକ କ'ଣ ?",
          img: '/example_image_one.png'
        },
        {
          key: "2",
          text:
            locale === "en"
              ? flags?.en_example_ques_two?.value ||
                "Tell me something about treatment of termites in sugarcane?"
              : flags?.or_example_ques_two?.value ||
                "ଆଖୁରେ ଟର୍ମାଇଟ୍ସର ଚିକିତ୍ସା ବିଷୟରେ ମୋତେ କିଛି କୁହନ୍ତୁ |",
          img: '/example_image_two.png'
        },
        {
          key: "3",
          text:
            locale === "en"
              ? flags?.en_example_ques_three?.value ||
                "How can farmers apply to government schemes in Odisha?"
              : flags?.or_example_ques_three?.value ||
                "କୃଷକମାନେ ଓଡିଶାରେ ସରକାରୀ ଯୋଜନାରେ କିପରି ଆବେଦନ କରିପାରିବେ ?",
          img: '/example_image_three.png'
        },
      ],
    },
    position: "left",
    exampleOptions: true,
  };
};
