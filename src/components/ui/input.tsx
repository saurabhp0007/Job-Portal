"use client";

import * as React from "react"

import { cn } from "@/lib/utils"
import EyeCloseIcon from "../icon/EyeCloseIcon"
import EyeOpenIcon from "../icon/EyeOpenIcon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [password, setPassword] = React.useState(true);

    return (
      <div className="relative">
        <input
          type={cn(type === "text" ? "text" : type == "password" && password ? "password" : "text")}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-6",
            className
          )}
          ref={ref}
          {...props}

        />
        <div className="absolute top-[50%] translate-y-[-50%] right-2 ">
          {type === "password" ? <div className="" onClick={() => setPassword((prev) => !prev)}>
            {password ? <EyeCloseIcon /> : <EyeOpenIcon />}
          </div> : null}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
