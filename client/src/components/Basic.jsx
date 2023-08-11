import Splitter, { SplitDirection } from "@devbookhq/splitter";

function Basic() {
  return (
    <div className="m-20">
      <Splitter direction={SplitDirection.Horizontal}>
        <div className="h-screen bg-red-700">
          <h1>hellodfgafasdfasfdasdfasdfasdfasdfasdfasfas</h1> 1
        </div>
        <div className="h-screen">Tile 2</div>
      </Splitter>
    </div>
  );
}
export default Basic;
