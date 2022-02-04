import http from "../http.js";

export function apiGetUsers() {
  return http.get("/data");
}

export function apiModifyUser(payload) {
  return http.post("/modify", payload);
}

export function apiDeleteUser(index) {
  return http.get("/delete", { params: { id: index } });
}
