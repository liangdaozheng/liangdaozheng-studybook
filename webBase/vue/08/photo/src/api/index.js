import http from "../utils/http.js";

export function apiLogin({ username, password }) {
  return http.post("/api/login", {
    username,
    password,
  });
}

export function apiGetPhotos() {
  return http.get("/api/getPhotos");
}

export function apiUpload(img, cb) {
  const data = new FormData();
  data.append("img", img);

  return http.post("/api/upload", data, {
    onUploadProgress(event) {
      const val = Math.floor((event.loaded / event.total) * 100);
      cb && cb(val);
    },
  });
}

export function apiGetPhoto(id) {
  return http.get("/api/getPhoto", {
    params: {
      pId: id,
    },
  });
}
