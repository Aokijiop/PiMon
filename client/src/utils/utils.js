import axios from "axios";

const Backend = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

const GenshinDevAPI = axios.create({
  baseURL: "https://genshin.jmp.blue",
});

export { Backend, GenshinDevAPI };
