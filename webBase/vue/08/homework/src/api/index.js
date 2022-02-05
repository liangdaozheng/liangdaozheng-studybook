import http from "../utils/http.js";

export function apiGetFormData() {
  return http.get("/data");
}

export function apiModifyFormData(payload) {
  return http.post("/modify", payload);
}

export function apiDeleteFormData(id) {
  return http.get("/delete", {
    params: {
      id,
    },
  });
}
