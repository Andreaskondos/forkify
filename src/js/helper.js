// import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

export const wait = function (s) {
  return new Promise(function (resolve) {
    setTimeout(resolve, s * 1000);
  });
};

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, upload = undefined) {
  try {
    const fetchpro = upload
      ? fetch(url, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(upload),
        })
      : fetch(url);
    const res = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)]);
    const { data } = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
