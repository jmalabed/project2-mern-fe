import { useState, useEffect } from "react";

const ParkEdit = (props) => {
  const [park, setPark] = useState({
    name: "",
    people: [],
    pets: false,
    packingList: "",
    visited: false,
    date: "",
  });
  const [packingLists, setPackingLists] = useState([]);

  console.log('list', packingLists);
  console.log('parks', park);

  const getPackingLists = async () => {
    try {
      const packingLists = await fetch(
        "https://project-two-backend.herokuapp.com/packingList"
      );
      const parsedPackingLists = await packingLists.json();
      // console.log(parsedPackingListItems)
      setPackingLists(parsedPackingLists);
      console.log(parsedPackingLists);
    } catch (err) {
      console.log(err);
    }
  };

  const packingListOptions = packingLists.map(list => {
    return (
      <option value={list.name}>{list.name}</option>
    )
  })

  //get park by id
  const getPark = async () => {
    try {
      const id = props.match.params.id;
      const foundPark = await fetch("https://project-two-backend.herokuapp.com/bucketList/" + id);
      if (foundPark.status === 200) {
        const parsedPark = await foundPark.json();
        setPark(parsedPark);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // destructure state variable and leave off the portions that are auto generated "_v, _id"
    const { name, people, pets, packingList, visited, date } = park;
    // make updates to the data after it is destructured here
    // define update object using the updated things
    const update = { name, people, pets, packingList, visited, date };
    const id = props.match.params.id;
    setPark(update)


    try {
      const config = {
        method: "PUT",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const updatedPark = await fetch(
        "https://project-two-backend.herokuapp.com/bucketList/" + id,
        config
      );
      const parsedPark = await updatedPark.json();
      props.history.push({ pathname: `/parkList/` });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    let updated = "";
    if (e.target.name === "people") {
      updated = e.target.value.replace(/\s+/g, "").split(",");
    }

    console.log(updated);
    setPark({ ...park, [e.target.name]: e.target.value, people: updated });

    console.log(park);
  };

  // const checkBox = park.map(parkItem => {
  //   console.log(parkItem);
  // })

  useEffect(() => {
    getPark();
    getPackingLists();
  }, []);

  return (
    <div className="top-gap">
      <h1>Edit Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <p>{park.name}</p>
        <input type="hidden" name="name" id="name" value={park.name} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="people">People: </label>
        <input name="people" id="people" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="packingList">Packing List: </label>
        <select>{packingListOptions}</select>
        <br />
        <br />
        <label htmlFor="pets">Pets:</label>
        <input type="checkbox" name="pets" id="pets" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="visited">Visited: </label>
        <input
          type="checkbox"
          name="visited"
          id="visited"
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="date">Date of Visit: </label>
        <input
          type="date"
          name="date"
          id="date"
          value=""
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Edit!" />
      </form>
    </div>
  );
};
export default ParkEdit;
// module.exports = {
//   packingListOptions
// }
