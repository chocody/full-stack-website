import bg from "./assets/bg/table.jpg";
import { useState } from "react";
import {
    Dice1,
    Dice2,
    Dice3,
    Dice4,
    Dice5,
    Dice6,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const diceMap = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6,
} as const;

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

function RollDice() {
    const [randomNumber, setRandomNumber] = useState<DiceValue | null>(null);
    const [rolling, setRolling] = useState(false);
    const [roll, setRoll] = useState(false);

    const naviagte = useNavigate();

    const randomDice = () => {
        rollDice;
        const result = Math.floor(Math.random() * 6) + 1;
        setRandomNumber(result as DiceValue);
    };

    const rollDice = () => {
        if (roll) {
            alert("You have already rolled the dice!");
            return;
        }
        setRolling(true);
        setTimeout(() => {
            randomDice();
            setRolling(false);
        }, 1000);
        setRoll(true);
    };

    const back = () => {
        if (!roll) {
            alert("You need to roll the dice before going back!");
            return;
        }
        setRoll(false);
        setRandomNumber(null);
        setRolling(false);
        naviagte("/");
    };

    const DiceIcon = randomNumber ? diceMap[randomNumber] : Dice1;

    return (
        <div
            className="min-h-screen w-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div onClick={back} className="self-start !pl-5 !pt-4 text-3xl hover:text-gray-500 cursor-pointer">
                ⯇
            </div>
            <div className="flex justify-center items-center w-full h-full !mt-60">
                <div className="flex flex-col items-center gap-10">
                    <div
                        onClick={rollDice}
                        className="w-60 h-60 rounded-2xl flex items-center justify-center cursor-pointer transition"
                    >
                        <DiceIcon
                            className={`w-60 h-60 text-black hover:fill-gray-200 fill-white ${rolling ? "animate-bounce" : ""}`}
                            strokeWidth={1}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RollDice;
