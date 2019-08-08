import { axios } from "@/http.js";

export function queryList(params) {
  return axios.get("/item/brand/page",params)
}
