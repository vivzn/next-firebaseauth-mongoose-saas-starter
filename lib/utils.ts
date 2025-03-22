import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRole(role: string) {
  if(role == "") return "No role"
  if(role == "pending") return "Waiting for Moderation"
  if(role == "mentor") return "Mentor"
  if(role == "mentoree") return "Student"

  return "Not found"
}