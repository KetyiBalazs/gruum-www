(function () {
  var SUPABASE_URL = "https://ekublmastumrhaxfoxzz.supabase.co";
  var SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdWJsbWFzdHVtcmhheGZveHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0ODE1MTAsImV4cCI6MjEwMjA1NzUxMH0._7-4qDbreuS7_dyayR-0xr1PlfmpyCpqGZQ5Ak4GvnU";

  var form = document.querySelector(".coming-soon-form");
  if (!form) return;

  var emailInput = form.querySelector("input[type='email']");
  var submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) return;

    var email = (emailInput.value || "").trim().toLowerCase();
    var source = form.getAttribute("data-source") || "coming-soon";

    form.classList.remove("is-error");
    if (submitButton) submitButton.disabled = true;

    fetch(SUPABASE_URL + "/rest/v1/coming_soon_signups", {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email: email, source: source }),
    })
      .then(function (response) {
        if (response.ok || response.status === 409) {
          form.classList.add("is-done");
          return;
        }
        throw new Error("Waitlist request failed");
      })
      .catch(function () {
        form.classList.add("is-error");
      })
      .then(function () {
        if (submitButton) submitButton.disabled = false;
      });
  });
})();
