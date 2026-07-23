const params = new URLSearchParams(window.location.search);

function showValue(id, paramName) {
  const value = params.get(paramName);
  document.querySelector(`#${id}`).textContent = value ? value : "Not provided";
}

showValue("firstName", "first_name");
showValue("lastName", "last_name");
showValue("email", "email");
showValue("phone", "phone");
showValue("orgName", "org_name");

const rawTimestamp = params.get("timestamp");

if (rawTimestamp) {
  const date = new Date(rawTimestamp);
  document.querySelector("#submitted").textContent = date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  });
} else {
  document.querySelector("#submitted").textContent = "Not available";
}