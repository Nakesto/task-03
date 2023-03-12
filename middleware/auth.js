export default function ({ store, redirect, route }) {
  if (
    !store.state.regis.isLogin ||
    store.state.regis.data === null ||
    store.state.regis.accessToken === null
  ) {
    if (route.name !== "login" && route.name !== "register") {
      redirect("/login");
    }
    redirect();
  } else {
    if (route.name == "login" || route.name == "register") {
      redirect("/");
    }
    redirect();
  }
}
