import Pedigree from "components/Pedigree";
import DiceContainer from "containers/DiceContainer";

function Home() {
  return (
    <div>
      <DiceContainer></DiceContainer>

      <Pedigree title="Aces" score={15} />
    </div>
  );
}

export default Home;
