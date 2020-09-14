const login = async (user) => {
  try {
    let response = await fetch("/auth/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  try {
    await fetch("/auth/logout", { method: "GET" });
    await window.location.reload(false);
    return;
  } catch (err) {
    console.log(err);
  }
};

const isUserAuthenticated = async (signal) => {
  try {
    let response = await fetch("/auth/user-authenticated/", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export { login, logout, isUserAuthenticated };
