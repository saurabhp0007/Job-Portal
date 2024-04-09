import React from 'react'
import Marquee from "react-fast-marquee";

const TrustUs = () => {
    return (
        <div className='mt-20'>
            <h2 className='lg:text-4xl mb-8 text-2xl font-medium text-center'>DeshJob is trusted by</h2>
            <div className="py-6 bg-white rounded-lg">
                <Marquee speed={100} gradient gradientWidth={100} gradientColor="rgb(248,251,254)" className="sm:space-x-16 space-x-8">
                    <div className="sm:gap-32 flex gap-12">
                        <img src="https://jobjack.co.za/assets/img/companyLogos/kfcsmallt.png" alt="brand-image" className='grayscale sm:w-28 sm:h-28 object-cover w-20 h-20' />
                        <img src="https://jobjack.co.za/assets/img/companyLogos/absolutepetssmall.png" alt="brand-image" className='grayscale sm:w-28 sm:h-28 object-cover w-20 h-20' />
                        <img src="https://jobjack.co.za/assets/img/companyLogos/Engen%20Logo.png" alt="brand-image" className='grayscale sm:w-28 sm:h-28 object-cover w-20 h-20' />
                        <img src="https://jobjack.co.za/assets/img/companyLogos/kauaismall.png" alt="brand-image" className='grayscale sm:w-28 sm:h-28 object-cover w-20 h-20' />
                        <img src="https://jobjack.co.za/assets/img/companyLogos/Engen%20Logo.png" alt="brand-image" className='grayscale sm:w-28 sm:h-28 object-cover w-20 h-20' />
                    </div>
                </Marquee>
            </div>
        </div>
    )
}

export default TrustUs