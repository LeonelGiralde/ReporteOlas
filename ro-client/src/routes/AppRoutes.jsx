import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import FormNov from "../Components/FormNov/FormNov";
import FormRep from "../Components/FormRep/FormRep";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form-nov" element={<FormNov />} />
      <Route path="/form-rep" element={<FormRep />} />
    </Routes>
  );
}

export default AppRoutes;