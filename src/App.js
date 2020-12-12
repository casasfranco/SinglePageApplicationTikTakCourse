import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./store";
import SingIn from "./users/SingIn";
import { logOut } from "./store/user";
import { PersistGate } from "redux-persist/integration/react";
import Videos from "./videos/Videos";
import VideosForm from "./videos/VideosForm";
import VideoShow from "./videos/VideoShow";

let NotImplemented = () => {
  return (
    <>
      <Link to="/videos">Ir a videos</Link>
      <h1>Esta página aún no está lista</h1>
    </>
  );
};

let Erorr404 = () => {
  return (
    <>
      <Link to="/">Regresar al incio</Link>
      <h1>Esta página no existe - 404</h1>
    </>
  );
};

let UsuariosOutlet = () => {
  let user = useSelector((state) => state.user.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const doLogOut = () => {
    dispatch(logOut());
    navigate("/usuarios/login");
  };

  return (
    <>
      {user && <button onClick={doLogOut}>Cerrar sesión</button>}
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<NotImplemented />} />

            <Route path="/usuarios" element={<UsuariosOutlet />}>
              <Route path="registro" element={<NotImplemented />} />
              <Route path="login" element={<SingIn />} />
              <Route path=":id" element={<NotImplemented />} />
              <Route path=":id/videos" element={<NotImplemented />} />
            </Route>

            <Route path="/videos">
              <Route path="/" element={<Videos />} />
              <Route path=":id" element={<VideoShow />} />
              <Route path="nuevo" element={<VideosForm />} />
            </Route>

            <Route path="*" element={<Erorr404 />}></Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
