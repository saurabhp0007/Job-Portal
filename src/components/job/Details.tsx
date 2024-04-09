import { jobInfoProps } from '@/types/types'
import parse from 'html-react-parser';
import Favorite from '../icon/Favorite';
import FavoriteJob from './FavoriteJob';

const Details = ({ jobDetailsData }: { jobDetailsData: jobInfoProps }) => {

    return (
        <div className="p-4 bg-white">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-green-500">{jobDetailsData.jobTitle}</h2>
                <FavoriteJob jobDetailsData={jobDetailsData} />
            </div>
            <h3 className="mt-2 text-lg font-semibold">{jobDetailsData.companyName}</h3>

            <div className="mt-4">
                <h4 className="details-sub-title">Vacancy</h4>
                <p className="details-des">{jobDetailsData.vacancy}</p>
            </div>

            <div className="mt-4">
                <h5 className="details-sub-title">Job Context</h5>
                <ul className="details-des list-none">
                    <li
                        dangerouslySetInnerHTML={{ __html: jobDetailsData.jobContext }}
                        className=" list-none"
                    />
                </ul>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Job Responsibilities</h5>
                <ul className="details-des">
                    <li
                        dangerouslySetInnerHTML={{ __html: jobDetailsData.jobResponsibilities }}
                        className="list-none"
                    />
                </ul>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Employment Status</h5>
                <p className='details-des'>Full-time</p>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Workplace</h5>
                <p className='details-des'>{jobDetailsData.employmentType}</p>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Educational Requirement</h5>
                <p className='details-des'>{jobDetailsData.education}</p>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Additional Requirements</h5>
                <div className="details-des">
                    <p>Age 20 to 30 years</p>
                    <p>Work experience in similar field is preferred but not mandatory.</p>
                </div>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Job Location</h5>
                <p className='details-des'>{jobDetailsData.location}</p>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Salary</h5>
                <p className="details-des">{jobDetailsData.salary}
                </p>
            </div>

            <div className="mt-4">
                <h5 className='details-sub-title'>Compensation & Other Benefits</h5>
                <ul className="details-des">
                    <li
                        dangerouslySetInnerHTML={{ __html: jobDetailsData.jobBenefit }}
                        className="list-none"
                    />

                </ul>
            </div>

        </div>
    )
}

export default Details