interface IResponseData<T> {
  code: number;
  message?: string;
  data: T;
}

// 用户接口
interface IResponseUserData {
  id: number;
  username: string;
  email: string;
}
// 文章接口
interface IResponseArticleData {
  id: number;
  title: string;
  author: IResponseUserData;
}

// function getData(url: string) {
//     return fetch(url).then(response => {
//         return response.json();
//     }).then(data => {
//         return data;
//     });
// }

async function getData<U>(url: string) {
  let response = await fetch(url);
  let data: Promise<IResponseData<U>> = await response.json();
  return data;
}

(async function() {

  let userData = await getData<IResponseUserData>('/user');
  userData.data.id;

  let articleData = await getData<IResponseArticleData>('/article');
  articleData.data.author;

})()