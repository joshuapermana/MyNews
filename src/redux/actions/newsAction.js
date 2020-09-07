/* eslint-disable prettier/prettier */
export const news = (request) => ({
    type: 'NEWS',
    payload: request,
  });
  export const allnews = (request) => ({
    type: 'ALLNEWS',
    payload: request,
  });
  