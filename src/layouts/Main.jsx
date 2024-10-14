import { Outlet } from "react-router-dom";
import Header from "../common/Header";

export default function Main(){
    return (
        <>
          <Header />
          <Outlet />
        </>
    );
}