import { Routes, Route } from "react-router-dom";
import ViewHome from "../Views/InicioAdmin/InicioAdmin";
import FormNov from "../Components/FormNov/FormNov";
import FormRep from "../Components/FormRep/FormRep";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ViewHome />} />
      <Route path="/form-nov" element={<FormNov />} />
      <Route path="/form-rep" element={<FormRep />} />
    </Routes>
  );
}

export default AppRoutes;