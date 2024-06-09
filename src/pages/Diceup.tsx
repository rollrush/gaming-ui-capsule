import { useEffect, useRef, useState } from "react";
import ReactDice, { ReactDiceRef } from "react-dice-complete";
// import "react-dice-complete/dist/react-dice-complete.css";

const Diceup = () => {
  const reactDice = useRef<ReactDiceRef>(null);
  const [selected, setSelected] = useState<number>(0);

  const [modalText, setModalText] = useState<string>("");
  const [reward, setReward] = useState<number>(1000);
  const [bet, setBet] = useState<number>(0);
  useEffect(() => {}, []);

  const rollDice = () => {
    reactDice.current?.rollAll();
  };
  //   console.log(reward);
  const afterRoll = (num: number) => {
    console.log(num, ":this is the number");
    console.log(selected, ":this is the selected");
    // setResult(num);
    console.log();

    const modalElement = document?.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement;

    switch (selected) {
      case 1:
        if (num < 7) {
          setReward((prevReward) => prevReward + bet + bet * 2);
          setModalText("You won! and the reward multiplier is 2x");
          modalElement?.showModal();
        } else {
          console.log("lost reward");
          console.log(reward - bet, "  ", bet, "this is reward");

          setReward((prevReward) => prevReward - bet);
          console.log(reward, "this is reward");
        }
        break;
      case 2:
        if (num === 7) {
          setModalText("You won! and the reward multiplier is 4x");
          setReward((prevReward) => prevReward + bet * 4);
          modalElement?.showModal();
        } else {
          console.log("lost reward");
          setReward((prevReward) => prevReward - bet);
          console.log(reward, "this is reward");
        }
        break;
      case 3:
        if (num > 7) {
          setModalText("You won! and the reward multiplier is 2x");
          setReward((prevReward) => prevReward + bet * 2);
          modalElement?.showModal();
        } else {
          console.log("lost reward");
          setReward((prevReward) => prevReward - bet);
          console.log(reward, "this is reward");
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Yay!</h3>
          <p className="py-4">{modalText}</p>
        </div>
      </dialog>
      <div className=" w-screen h-screen bg-yellow-700 flex justify-center items-center flex-col">
        <div className="bg-yellow-100 rounded-full px-3 py-1 text-black mb-2 ">
        <h1 className="text-2xl font-cls2">Your Reward : {reward}</h1>
        </div>
        <div className="card bg-yellow-100  bg-base-100 shadow-xl w-max">
          <div className="flex justify-center">
            <input
              type="number"
              max={reward}
              min={10}
              onChange={(e) => {
                let num = parseInt(e.target.value);
                if (num > reward) {
                  alert("Bet should not be less than your account balance");
                }
                setBet(num);
                console.log(reward, "this is reward");

                return;
              }}
              placeholder="Make Bet"
              className="input border bg-transparent placeholder:text-yellow-600 border-yellow-600 rounded-full mt-8 w-[25vw] mb-4 px-4  "
            />
          </div>
          <div className="flex justify-center">
          <div className="bg-yellow-800 w-[25vw] rounded-2xl flex justify-center">
            <ReactDice
              rollDone={afterRoll}
              numDice={2}
              rollTime={1}
              disableIndividual
              ref={reactDice}
              faceColor="radial-gradient(circle, rgba(232, 133, 25, 1) 0%, rgba(255, 210, 68, 1) 100%)"
              dotColor="#fff"
              dieSize={90}
            />
          </div>
          </div>
          <div className="card-body items-center text-center w-max">
            <div className="flex p-1 ">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-yellow-800 font-bold mr-2 text-md">
                    Seven Down
                  </span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio bg-yellow-600 checked:bg-red-500"
                    checked={selected === 1}
                    onChange={() => setSelected(1)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-yellow-800  font-bold mr-2 text-md">Seven</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio bg-yellow-600 checked:bg-green-500"
                    checked={selected === 2}
                    onChange={() => setSelected(2)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-yellow-800  font-bold mr-2 text-md">Seven Up</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio bg-yellow-600 checked:bg-yellow-600"
                    checked={selected === 3}
                    onChange={() => setSelected(3)}
                  />
                </label>
              </div>
            </div>
            <div className="card-actions"></div>
          </div>
        </div>
        <button onClick={rollDice} className="btn hover:bg-black bg-yellow-500 mb-10 text-white font-cls3 rounded-full text-2xl mt-3">
          Roll Dice
        </button>
      </div>
    </>
  );
};

export default Diceup;
