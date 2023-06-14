'use client'

import React from "react"
import Image from "next/image"

const Spotlight = () => {
    const useMousePosition = () => {
        const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
        React.useEffect(() => {
            const updateMousePosition = (ev: MouseEvent) => {
                setMousePosition({ x: ev.clientX, y: ev.clientY })
            }
            window.addEventListener('mousemove', updateMousePosition)
            return () => window.removeEventListener('mousemove', updateMousePosition)
        }, [])

        return mousePosition;
    }

    const mousePos = useMousePosition()

    return (
        <div style={{
            '--x': `clamp( -30px, calc((${mousePos.x}px - 50vw)/10), 30px)`,
            '--y': `clamp( -30px, calc((${mousePos.y}px - 50vh)/10), 30px)`,
            '--rec-x': `calc(var(--x) + 50%)`,
        } as React.CSSProperties} className='bg-black flex justify-center items-center h-[66vh] relative overflow-hidden'>
            <div className='bg-white opacity-50 w-[150vmax] h-[320px] blur-sm -rotate-45 absolute origin-[0%_50%] translate-x-[--rec-x] translate-y-[--y]'></div>
            <div className='bg-white w-[320px] h-[320px] rounded-full blur-sm absolute translate-x-[--x] translate-y-[--y]'></div>
            <img className='w-[240px] absolute -translate-x-[calc(var(--x)/4)] -translate-y-[calc(var(--y)/4)]' src='/logos/actai-shadow.svg' alt="logo" />
            <img className='w-[240px] absolute' src="/logos/actai-k.svg" alt="logo"  />

            {/* <p className="text-white fixed bg-black">{JSON.stringify(mousePos)}</p> */}
        </div>
    );

}

export default Spotlight;