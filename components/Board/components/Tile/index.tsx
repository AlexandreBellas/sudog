import { Button, ButtonGroup, ButtonText } from "@/components/ui/button"

interface ITileProps {
    value: ITile
}

export default function Tile({
    value
}: Readonly<ITileProps>) {
    return (
        <ButtonGroup className="bg-white aspect-square justify-center items-center">
            <Button>
                <ButtonText>
                    1
                </ButtonText>
            </Button>
        </ButtonGroup>
        // <Box className="border-2 border-black aspect-square">
        //     <Text className="font-bold">1</Text>
        // </Box>
    )
}