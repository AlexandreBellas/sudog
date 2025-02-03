import one from "@/assets/images/tiles/1.png"
import two from "@/assets/images/tiles/2.png"
import three from "@/assets/images/tiles/3.png"
import four from "@/assets/images/tiles/4.png"
import five from "@/assets/images/tiles/5.png"
import six from "@/assets/images/tiles/6.png"
import seven from "@/assets/images/tiles/7.png"
import eight from "@/assets/images/tiles/8.png"
import nine from "@/assets/images/tiles/9.png"

export const mapNumberToBackground = (number: number) => {
    switch (number) {
        case 1:
            return one
        case 2:
            return two
        case 3:
            return three
        case 4:
            return four
        case 5:
            return five
        case 6:
            return six
        case 7:
            return seven
        case 8:
            return eight
        case 9:
            return nine
        default:
            throw new Error("Invalid number")
    }
}
