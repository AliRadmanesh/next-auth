export const getAllPosts = ({ accessToken }: { accessToken: string }) => {
  console.log({ accessToken });
  return new Promise((resolve, reject) => {
    fetch('/api/posts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((res) => {
        res
          .json()
          .then((json) => resolve(json))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};
