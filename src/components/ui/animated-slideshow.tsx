"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextStaggerHoverProps {
  text: string
  index: number
}
interface HoverSliderImageProps {
  index: number
  imageUrl: string
}
interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}
function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return {
    words,
    characters,
  }
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)
function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className }, _ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

const WordStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, _ref) => {
  return (
    <span
      className={cn("relative inline-block origin-bottom overflow-hidden", className)}
      {...props}
    >
      {children}
    </span>
  )
})
WordStaggerHover.displayName = "WordStaggerHover"

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, children: _children, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { words } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)
  return (
    <span
      className={cn(
        "relative inline-block origin-bottom overflow-hidden cursor-pointer",
        className
      )}
      {...props}
      ref={ref}
      onMouseEnter={handleMouse}
    >
      {words.map((word: string, wIndex: number) => {
        const chars = word.split("");
        // Calculate global index offset for this word to keep delays sequential
        const offset = words.slice(0, wIndex).reduce((acc: number, w: string) => acc + w.length, 0);
        return (
          <span key={wIndex} className="inline-block whitespace-nowrap">
            {chars.map((char: string, cIndex: number) => {
              const globalIndex = offset + cIndex;
              return (
                <span
                  key={`${char}-${globalIndex}`}
                  className="relative inline-block overflow-hidden"
                >
                  <MotionConfig
                    transition={{
                      delay: globalIndex * 0.015,
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <motion.span
                      className="inline-block opacity-20 transition-colors text-[var(--text)]"
                      initial={{ y: "0%" }}
                      animate={isActive ? { y: "-110%" } : { y: "0%" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>

                    <motion.span
                      className="absolute left-0 top-0 inline-block opacity-100 transition-colors text-[var(--text)]"
                      initial={{ y: "110%" }}
                      animate={isActive ? { y: "0%" } : { y: "110%" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  </MotionConfig>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
}
export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, children, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      src={imageUrl}
      className={cn("inline-block align-middle", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"
