"use client"
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
    <main >
      <div className='bg '>
        <HeroPage />
      </div>
      <Hero2Dasboard />
    </main>
  )
}
