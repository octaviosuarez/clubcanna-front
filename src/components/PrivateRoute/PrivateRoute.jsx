import { Navigate } from "react-router-dom";
import useStore from "../../store/useStore";

const PrivateRoute = ({ children, required }) => {
    const { userData } = useStore();
    const userLevel = userData?.level

    if (!userLevel) {
        return <Navigate to={'/login'} replace={true} />
    }

    if (required) {
        if (required === 'admin' && userLevel !== 'admin') {
            return
        }
    }

    return children;
}

export default PrivateRoute;