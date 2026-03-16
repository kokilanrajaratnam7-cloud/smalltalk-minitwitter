import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,          // 10 virtual users
  iterations: 10000 // total requests
};

export default function () {
  const res = http.get("http://localhost/posts");

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}