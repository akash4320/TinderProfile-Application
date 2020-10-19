
export default function userDetailService(id){
    return new Promise((resolve, reject) => {
        fetch(
              `https://dummyapi.io/data/api/user/${id}`,
              {
                method: 'GET',
                headers:{'app-id':'5f8e1ec64f2b0f50459cf3aa'}
              },
            )
              .then(response => response.json())
              .then(responseJson => {resolve({userDetails:responseJson})})
              .catch(err => {
                reject({err:`Sorry for error: ${err}`});
              });
    });
};