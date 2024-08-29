import { Outlet } from "react-router-dom";
import MenuNavbar from "../../components/Menu";

const Main = () => {
    return (
        <div>
            <MenuNavbar content={<Outlet />}/>
        </div>
    )
}

export default Main;


