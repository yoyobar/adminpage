export default function TaskItem() {
  return (
    <div className="font-mono w-full p-4">
      <div className="flex flex-col gap-2 border-b pb-2">
        <div className="flex gap-4">
          <input id="1" className="form-checkbox " type="checkbox"></input>
          <label htmlFor="1">Buy Groceries</label>
        </div>
        <ul className="font-thin">Due today</ul>
        <ul className="font-thin">Category: Shopping</ul>
      </div>
    </div>
  );
}
