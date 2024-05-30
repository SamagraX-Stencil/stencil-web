export var getInitialMsgs = function getInitialMsgs(t, flags, locale) {
  var _flags$en_example_que, _flags$or_example_que, _flags$en_example_que2, _flags$or_example_que2, _flags$en_example_que3, _flags$or_example_que3;
  return {
    payload: {
      buttonChoices: [{
        key: "1",
        text: locale === "en" ? (flags === null || flags === void 0 || (_flags$en_example_que = flags.en_example_ques_one) === null || _flags$en_example_que === void 0 ? void 0 : _flags$en_example_que.value) || "What are the different types of millets grown in Odisha?" : (flags === null || flags === void 0 || (_flags$or_example_que = flags.or_example_ques_one) === null || _flags$or_example_que === void 0 ? void 0 : _flags$or_example_que.value) || "ଓଡ଼ିଶାରେ ଉତ୍ପାଦନ ହେଉଥିବା ବିଭିନ୍ନ ପ୍ରକାର ମିଲେଟ୍ ଗୁଡିକ କ'ଣ ?",
        img: '/example_image_one.png'
      }, {
        key: "2",
        text: locale === "en" ? (flags === null || flags === void 0 || (_flags$en_example_que2 = flags.en_example_ques_two) === null || _flags$en_example_que2 === void 0 ? void 0 : _flags$en_example_que2.value) || "Tell me something about treatment of termites in sugarcane?" : (flags === null || flags === void 0 || (_flags$or_example_que2 = flags.or_example_ques_two) === null || _flags$or_example_que2 === void 0 ? void 0 : _flags$or_example_que2.value) || "ଆଖୁରେ ଟର୍ମାଇଟ୍ସର ଚିକିତ୍ସା ବିଷୟରେ ମୋତେ କିଛି କୁହନ୍ତୁ |",
        img: '/example_image_two.png'
      }, {
        key: "3",
        text: locale === "en" ? (flags === null || flags === void 0 || (_flags$en_example_que3 = flags.en_example_ques_three) === null || _flags$en_example_que3 === void 0 ? void 0 : _flags$en_example_que3.value) || "How can farmers apply to government schemes in Odisha?" : (flags === null || flags === void 0 || (_flags$or_example_que3 = flags.or_example_ques_three) === null || _flags$or_example_que3 === void 0 ? void 0 : _flags$or_example_que3.value) || "କୃଷକମାନେ ଓଡିଶାରେ ସରକାରୀ ଯୋଜନାରେ କିପରି ଆବେଦନ କରିପାରିବେ ?",
        img: '/example_image_three.png'
      }]
    },
    position: "left",
    exampleOptions: true
  };
};