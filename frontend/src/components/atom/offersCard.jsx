const SpecialOfferCard = ({ title, features,price, originalPrice, discountLabel, duration, isActive, onClick,}) => {
    return (<div
            className={`bg-black-40 backdrop-blur-md p-6 rounded-lg  text-white relative mb-4 md:mb-0 border hover:border-pink-600 border-white/10 ${isActive ? "border-[#ff0783] bg-pink-600/50" : ""}`}
            onClick={onClick}
        >
            <div className="absolute top-2 right-2 px-3 py-1 bg-[#a229e8] text-xs uppercase font-semibold rounded-[3px]">
                Special Offer
            </div>
            <div className="flex flex-col items-center text-center h-full justify-between">
                <div className="text-3xl font-bold mt-6 mb-2 w-full text-start">
                    {title}
                </div>
                <ul className="text-sm mb-6 list-disc text-start pl-5">
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <div className="flex justify-between items-center w-full">
                    <div className="text-sm rounded font-bold border p-2">
                        {duration}
                    </div>
                    <div className="text-4xl font-bold">₹{price}</div>
                </div>
                <div className="flex justify-end w-full mt-1">
                    <div className="text-xs line-through text-gray-400 mr-2">
                        ₹{originalPrice}
                    </div>
                    <div className="text-sm">{discountLabel}</div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOfferCard;