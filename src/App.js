import React, { useState } from "react"; //importing React and useState hook from react
import { CircularProgress } from "@mui/material";
import './App.css'  //importing App.css file from the same folder
const App = () => { // creating component named App
     //defining state variables using hooks
     const [circularIndicatorColor , setCircularIndicatorColor] = useState('white');
    const [searchItem , setSearchItem] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [data , setData] = useState([]);
    const [noOfImages , setNoOfImages] = useState();
    // creating function searchImage which is called after pressing the button "Search"
    const searchImage = (e) => {
        e.preventDefault(); // preventing the default behaviour of the button click
        // if resubmitted , setting the value of data to empty array
        setData([]);
        // if resubmitted ,  again setting the value of isLoading to true so that loading icon could show up
        setIsLoading(true);
        async function call() //creating the asnychronous function
        {
            setCircularIndicatorColor('blue')
            //fetching the external unsplash Image API and waiting for it to arrive
        const res = await fetch(`https://api.unsplash.com/search/photos/?query=${searchItem}&per_page=${noOfImages}&client_id=5NCCvnVoz2dcOwT0duPKJfT3NuCVnz0LOHF5T1Miuro`)
        //waiting for converting the response given from API into JSON 
        const data1 = await res.json();
        //updating the state variable data using the method setData() from API responded data
        setData(data1.results);
        setIsLoading(false);
        }
        call(); //calling the call method
    }
    return ( //returning the JSX from the App component
        <>
        <h1 style={{textAlign:'center' , textTransform:'uppercase'}}>Image Searcher</h1>
        <header>
            <input type="text" placeholder="Enter anything" value={searchItem} onChange={(e)=>{
                setSearchItem(e.target.value)
                console.log(searchItem)
            }}/>
            <input type="number" placeholder="how many images you want?"
            value={noOfImages} onChange={(e)=>{
                setNoOfImages(e.target.value)
            }}
            />
            <button onClick={searchImage}>Search</button>
        </header>
        <section>
            {
              isLoading ? <CircularProgress style={{color:`${circularIndicatorColor}`,position:'relative',top:'15rem' , width:'5rem'}}/> : 
            data && data.map((el)=>{ // data is an array and hence we can loop through it using map method which accepts an element inside an array at a specific interval of time as an parameter
              return (
                <div className="mainDiv">
                    {/* each element of an array consists of urls properties given by the API which again consists of full property which has an image url */}
                <img src={el.urls.full} alt=""/>
                </div>
                )
            })
        }

        </section>
        </>
    )
}
export default App;