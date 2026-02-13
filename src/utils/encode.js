export const encodeData = (data) => {
  return encodeURIComponent(
    btoa(unescape(encodeURIComponent(JSON.stringify(data))))
  );
};

export const decodeData = (str) => {
  return JSON.parse(
    decodeURIComponent(escape(atob(decodeURIComponent(str))))
  );
};

