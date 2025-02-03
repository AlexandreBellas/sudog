import { IDifficultyLevel } from "@/@types/game"
import easyBackground from "@/assets/images/levels/easy.png"
import expertBackground from "@/assets/images/levels/expert.jpg"
import hardBackground from "@/assets/images/levels/hard.jpg"
import mediumBackground from "@/assets/images/levels/medium.png"

export const mapLevelToBackgroundImage = (level: IDifficultyLevel) => {
    switch (level) {
        case "easy":
            return easyBackground
        case "medium":
            return mediumBackground
        case "hard":
            return hardBackground
        default:
            return expertBackground
    }
}
