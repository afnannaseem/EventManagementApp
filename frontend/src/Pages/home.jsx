import CheckIcon from '@mui/icons-material/Check';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import sendRequest from '../Api Call/apiCalls';
import ResponsiveAppBar from '../Component/Appbar';
import CopyRight from '../Component/CopyRight';
import PopularEvent from '../Component/PopularCard';
import SliderImage from '../Component/SliderContent';
import BestPart from '../Component/bestPart';
import "../Style/bootstrap.css";
import "../Style/home.css";
function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft -= 500;
    }
    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft += 500;
    }
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const { data: Popular, isLoading, isError } = useQuery({
        queryKey: ['popular'],
        queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getTopEvents", 'GET'),
        staleTime: 0,
    })
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ResponsiveAppBar />
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                fade={true}
                interval={2000}
                controls={false}
                indicators={false}
            >
                <Carousel.Item >
                    <SliderImage index={0} />
                </Carousel.Item>
                <Carousel.Item>
                    <SliderImage index={1} />
                </Carousel.Item>
                <Carousel.Item>
                    <SliderImage index={2} />
                </Carousel.Item>
            </Carousel>
            <div className='trustedContainer'>
                <p style={{ color: "#c2c2c2", fontWeight: "bold", marginTop: "0px" }}>Trusted by:</p>
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png' alt='' className='trustedImag' />
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png' alt='' className='trustedImag' />
                <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png' alt='' className='trustedImag' />
            </div>
            <div style={{ marginTop: 40 }}>
                <h2 style={{ color: "#404145", fontWeight: "bold", fontSize: 35, marginLeft: "12%", marginBottom: 30 }}>
                    Popular Events
                </h2>
                <div className='relative flex items-center' style={{ marginLeft: "6%", marginRight: "6%" }}>
                    <MdChevronLeft className='text-customGray cursor-pointer hover:text-customGray2' size={40} onClick={slideLeft} />
                    <div id='slider' className='w-full overflow-x-scroll overflow-y-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide'
                        style={{
                            padding: 15,
                        }}
                    >
                        {
                            Popular?.events?.map((item, index) => (
                                <PopularEvent
                                    key={item.eventName + index} // Add a unique key here
                                    title={item?.eventName}
                                    description={item?.description}
                                    pic={item?.pic[0]}
                                    date={item?.dateTime ? item?.dateTime.split('T')[0] : 'No date available'}
                                />
                            ))
                        }
                    </div>
                    <MdChevronRight className='text-customGray cursor-pointer hover:text-customGray2' size={40} onClick={slideRight} />
                </div>
                <div style={{ marginTop: 80, height: windowWidth > 1080 ? "900px" : "1600px", width: "100%", backgroundColor: "#f1fdf7" }}>
                    <div style={{ display: windowWidth > 1080 ? 'flex' : null, flexDirection: "row" }}>
                        <div>
                            <div style={{ paddingTop: "120px" }}>
                                <h1 style={{ fontSize: 35, fontWeight: 'bold', marginBottom: "30px", marginLeft: "10%" }} >The best part? Everything.</h1>
                                <div style={{ display: 'flex', marginLeft: "11%" }}>
                                    <CheckIcon size={30} sx={{ color: "#62646a" }} />
                                    <h3 style={{ fontSize: 25 }}>
                                        Expert Event Planners
                                    </h3>
                                </div>
                                <p style={{ color: "#62646a", marginLeft: "11%", width: "50%" }}>
                                    Our team of seasoned event planners brings creativity, expertise, and a wealth of experience to the table. We're here to transform your vision into a meticulously planned reality.
                                </p>
                            </div>
                            <BestPart title={"Tailored Solutions"} subtitle={"No two events are alike, and neither are our solutions. We pride ourselves on offering customized event management packages to suit your unique preferences, themes, and budget"} />
                            <BestPart title={"Seamless Execution"} subtitle={"Sit back, relax, and watch as we seamlessly execute every aspect of your event. From venue selection and decor to catering and entertainment, we handle it all with precision and flair."} />
                            <BestPart title={"Innovative Themes"} subtitle={" Looking for that extra touch of uniqueness? Our innovative event themes will set the stage for an unforgettable experience, leaving your guests in awe."} />
                            <BestPart title={"Technology Integration"} subtitle={"Stay connected and informed throughout the planning process. Our use of cutting-edge technology ensures effective communication and real-time updates on your event's progress."} />
                        </div>
                        <div style={{ paddingTop: windowWidth > 1080 ? "180px" : "30px", paddingRight: "8%", marginLeft: windowWidth > 1080 ? null : "12%" }}>
                            <img src="https://www.greyeagleresortandcasino.ca/uploads/2023/03/live-concert-at-the-grey-eagle-event-centre-mobile.jpg" alt='none.png' />
                        </div>
                    </div>
                </div>
            </div>
            <CopyRight sx={{ pt: 10, pb: 10, color: 'black' }} />
        </div >
    );
}
export default ControlledCarousel;