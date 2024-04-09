"use client";
import React from 'react'
import { Button } from '../ui/button'
import JobFinder from '../svg/JobFinder';
import Employers from '../svg/Employers';
import Link from 'next/link';
import Container from './Container';


const Feature = () => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <h2 className=" sm:text-4xl text-2xl font-medium">Why DeshJob?</h2>
        <p className="lg:text-xl mt-4 text-base text-gray-500">Motivated by our vision to Employ the World, we believe through exceptional service and innovation we can create greater accessibility for both job seekers and employers. Our technology provides the opportunity to experience modern recruitment methods on one comprehensive, cost-effective and convenient platform.</p>
      </div>
      <div className="lg:grid-cols-2 sm:gird-cols-1 grid gap-4 mt-10">
        <div className="p-4 bg-white rounded-lg shadow">
          <Employers className="sm:w-80 sm:h-80 w-60 h-60 mx-auto" />
          <div className="">
            <h3 className='lg:text-xl text-lg font-bold'>Are you looking for an entry-level job?</h3>
            <p className='lg:text-lg mt-4 text-sm text-gray-500'>Register on DashJob to create your profile and apply for jobs in your surrounding areas! We also have job resources available to help you on your application journey and make sure you are interview ready.</p>
            <div className="text-center">
              <Button asChild className='px-12 mx-auto mt-8 text-base rounded-full' size="lg">
                <Link href="/job">Find a job</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <JobFinder className="sm:w-80 sm:h-80 w-60 h-60 mx-auto" />
          <div className="">
            <h3 className='lg:text-xl text-lg font-bold'>Are you looking for entry-level staff?</h3>
            <p className='mt-4 text-lg text-gray-500'>Register on JOBJACK to create your profile and apply for jobs in your surrounding areas! We also have job resources available to help you on your application journey and make sure you are interview ready.</p>
            <div className="text-center">
              <Button asChild className='px-12 mx-auto mt-8 text-base rounded-full' variant="secondary" size="lg">
                <Link href="/job">Book a demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feature