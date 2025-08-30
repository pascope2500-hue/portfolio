import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-gray-100 text-gray-700 border border-gray-300"
      case "Intermediate":
        return "bg-blue-100 text-blue-700 border border-blue-200"
      case "Advanced":
        return "bg-green-100 text-green-700 border border-green-200"
      case "Expert":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300"
    }
  }

  const getLevelPillColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-gray-200 text-gray-600"
      case "Intermediate":
        return "bg-blue-200 text-blue-700"
      case "Advanced":
        return "bg-green-200 text-green-700"
      case "Expert":
        return "bg-yellow-200 text-yellow-800"
      default:
        return "bg-gray-200 text-gray-600"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium text-sm shadow-sm transition-colors",
        getLevelColor()
      )}
    >
      <span className="font-semibold">{name}</span>
      <span
        className={cn(
          "px-2 py-0.5 rounded-full text-xs font-semibold",
          getLevelPillColor()
        )}
      >
        {level}
      </span>
    </span>
  )
}