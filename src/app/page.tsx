"use client"
import { APIshowCase } from '@/components/Home/APIshowCase';
import { Hero2Dasboard } from '@/components/Home/DashboardHome'
import HeroPage from '@/components/Home/HeroPage';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])
  return (
    <div >
      <div className=''>
        <HeroPage />
      </div>
      <div>
        <APIshowCase />
      </div>
      <div>
        {/* <Hero2Dasboard /> */}
      </div>
    </div>
  )
}
