import React, { useEffect, useState } from 'react';
import "../Style/bootstrap.css";
const SliderImage = (props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div
            className="d-block w-100"
            style={{ height: "700px", backgroundColor: "#0a4226" }}>
            <img style={{
                opacity: 0.3, height: "100%", width: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
            }}
                src={
                    props.index === 0
                        ? 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG11c2ljJTIwY29uY2VydHxlbnwwfHwwfHx8MA%3D%3D'
                        : props.index === 1
                            ? "https://365thingsinhouston.com/wp-content/uploads/2023/04/top-live-shows-concerts-in-houston-this-week-april-24-30-2023-white-oak-music-hall.jpg"
                            : "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?cs=srgb&dl=pexels-wendy-wei-1190297.jpg&fm=jpg"
                }
                alt="First slide"
            />
            <div style={{ position: 'absolute', height: "100%", width: "100%" }}>
                <h1 style={{ color: "white", width: windowWidth < 700 ? "55%" : "40%", marginTop: windowWidth < 700 ? "20%" : "15%", marginLeft: "10%", fontSize: 35, fontWeight: 'bold', }}>
                    Welcome to Fast University - Crafting Unforgettable Events
                </h1>
                <p style={{ color: "white", width: windowWidth < 700 ? "65%" : "40%", marginTop: "20px", marginLeft: "10%" }}>
                    At Fast University, we understand the importance of creating memorable experiences. Our passion for event management goes beyond organizing; we strive to curate moments that leave a lasting impact. Whether you're planning a corporate gathering, a wedding celebration, or a special occasion, we are your trusted partner in turning visions into reality.
                </p>
            </div>
        </div>

    );

}
export default SliderImage;