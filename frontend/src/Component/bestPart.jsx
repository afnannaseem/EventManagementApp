import CheckIcon from '@mui/icons-material/Check';
import React from "react";
export default function  BestPart(props) {
    return (
        <div style={{ paddingTop: "20px" }}>
            <div style={{ display: 'flex', marginLeft: "11%" }}>
                <CheckIcon size={30} sx={{ color: "#62646a" }} />
                <h3 style={{ fontSize: 25 }}>
                    {props.title}
                </h3>
            </div>
            <p style={{ color: "#62646a", marginLeft: "11%", width: "50%" }}>
                {props.subtitle}
            </p>
        </div>
    )
}