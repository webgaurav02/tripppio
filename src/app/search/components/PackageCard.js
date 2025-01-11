import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PackageCard = ({ packageData }) => {
    const { title, startingPrice, host, activities, images } = packageData;

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Hide arrows if needed
    };

    return (
        <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white flex flex-col justify-between">
            <div className="flex-shrink-0">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={title} className="w-full h-48 object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <p className="text-sm text-gray-500">{host}</p>
                    </div>
                    <div className="text-right font-bold">
                        <p className="leading-5 text-[0.6rem]">STARTING</p>
                        <p className="leading-5 text-4xl ">₹{startingPrice}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="text-sm py-1 text-gray-700">
                        {activities.map((activity, index) => (
                            <spa className="mr-2 bg-accent text-white py-1 px-3 rounded-full text-xs font-semibold" key={index}>{activity}</spa>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
