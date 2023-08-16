import axiosRequest from "axios";

axiosRequest
  .get("https://www.boredapi.com/api/activity")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));

for (let i = 0; i < 100000; i++) {
  console.log(i);
}
