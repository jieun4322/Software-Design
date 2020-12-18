const axios = require("axios");
const cheerio = require("cheerio");


//export var keyword = 'sports'//검색 키워드
var url = 'https://news.google.com/search?q=';  
var ulList = [];

const getHtml = async (keyword) => {
  try {
    return await axios.get(url + keyword);
  } catch (error) {
    console.error(error);
  }
};

const get_newsParsing = async(keyword) => {
  getHtml(keyword)
    .then(html => {
      const $ = cheerio.load(html.data);
      const $bodyList = $("div.xrnccd").children("article");

      $bodyList.each(function(i, elem) {
        ulList[i] = {
            title: $(this).find('h3 > a').text(),                             //제목
            date: $(this).find('time').attr('datetime'),                      //날짜
            url : 'http://news.google.com'+$(this).find('h3 > a').attr('href')//링크
        };
      });

      const data = ulList.filter(n => n.title);
      console.log(data);
      return data;
    })//출력
    //.then(res => console.log(res));
}