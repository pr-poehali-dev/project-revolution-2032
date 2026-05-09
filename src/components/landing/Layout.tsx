import { ReactNode } from 'react'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-[#09000f] relative">
      <div className="absolute inset-0 z-10">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={48}
          borderColor="#2a1040"
          hoverFillColor="#1a0530"
        />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(179,102,255,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(255,100,0,0.07) 0%, transparent 60%)'
        }}
      />
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  )
}
