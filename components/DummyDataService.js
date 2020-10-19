
export default function DummyDataService(){
    return new Promise((resolve, reject) => {
        fetch(
              'https://dummyapi.io/data/api/user',
              {
                method: 'GET',
                headers:{'app-id':'5f8e1ec64f2b0f50459cf3aa'}
              },
            )
              .then(response => response.json())
              .then(responseJson => resolve({usersList:responseJson.data}))
              .catch(err => {
                reject({err:`Sorry for error: ${err}`});
              });
    });
};