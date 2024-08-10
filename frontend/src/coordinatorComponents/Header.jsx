import React from "react";
import { useSelector } from "react-redux";
const Header = () => {
    const requests = useSelector((state) => state.request.requests);
    console.log(requests);
    return (
        <>
        <div>
            <span>Requests: {requests.length}</span>
        </div>
        </>
    )
}

export default Header;