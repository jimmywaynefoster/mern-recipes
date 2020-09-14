const register = async (user) => {
  try {
    let response = await fetch("/auth/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("/api/users/", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const readProfile = async (signal) => {
  try {
    let response = await fetch("/api/user", {
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

const update = async (user) => {
  try {
    let response = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        credentials: "include",
      },
      body: user,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const changePassword = async (user) => {
  try {
    let response = await fetch("/api/user/password", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async () => {
  try {
    let response = await fetch("/api/user", {
      method: "DELETE",
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

export { register, list, readProfile, update, changePassword, remove };
