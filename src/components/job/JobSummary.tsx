import { jobInfoProps } from '@/types/types'
import moment from 'moment'
import React from 'react'

const JobSummary = ({ jobDetailSummary }: { jobDetailSummary: jobInfoProps }) => {
    return (
        <div className="sticky top-0 bg-white rounded-lg">
            <h3 className="bg-slate-700 px-4 py-2 text-lg font-semibold text-white rounded-t-lg">Job Summary</h3>
            <div className="px-4 mt-4 space-y-2">
                <div className="">
                    <h4 className="job-summary-sub-title">Published on: <span className="job-summary-des">{moment(jobDetailSummary?.createdAt).format(' D MMMM YYYY')}</span> </h4>
                </div>

                <div className="">
                    <h4 className="job-summary-sub-title">Vacancy: <span className="job-summary-des">{jobDetailSummary?.vacancy}</span> </h4>
                </div>

                <div className="">
                    <h4 className="job-summary-sub-title">Employment Status: <span className="job-summary-des">Full time</span> </h4>
                </div>

                <div className="">
                    <h4 className="job-summary-sub-title">Age: <span className="job-summary-des">20 to 30</span> </h4>
                </div>

                <div className="">
                    <h4 className="job-summary-sub-title">Job Location: <span className="job-summary-des">{jobDetailSummary.location}</span> </h4>
                </div>

                <div className="">
                    <h4 className="job-summary-sub-title">Application Deadline: <span className="job-summary-des">{moment(jobDetailSummary.deadline).format("D MMMM YYYY")}</span> </h4>
                </div>
            </div>
        </div>
    )
}

export default JobSummary