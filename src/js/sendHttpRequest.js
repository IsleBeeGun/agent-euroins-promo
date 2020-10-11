export default function sendHttpRequest(data, url, method) {
  //console.log('[Inside XHR:] ', data);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = function () {
      if ((this.status >= 200) & (this.status < 300)) {
        resolve(xhr.response);
      } else {
        // new Error("Проблема с сервером")
        reject(xhr.response);
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        errors: ['Проблема с интернет-соединением'],
      });
    };
    xhr.send(JSON.stringify(data));
  });
}
