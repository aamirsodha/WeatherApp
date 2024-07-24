let txtinputtext = document.getElementById("txtsearch")


// async function getWeather(city){
//     const ApiKey = "0603243fa2cb174b13e0cfb730436b1a"
//     const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${ApiKey}&q=${city}`;
    
//     // let data = fetch(ApiUrl)
//     // data.then((response) => {
//     //     return response.json()
//     // })
//     // .then((result) => {
//     //     console.log(result)
//     // })

//     let resp = await fetch(ApiUrl)
//     let res = await resp.json()
//     console.log(res)
// }

// getWeather(CityName)

let MyFunc = async(city) =>{
    try {
        if(city.trim().length === 0)
        {
            alert("Enter City")
        }
        else
        {
            const ApiKey = "0603243fa2cb174b13e0cfb730436b1a"
        const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${ApiKey}&q=${city}`;
        // const ApiUrl=`https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${ApiKey}&q=${city}`
        let response = await fetch(ApiUrl)
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // console.log(response)
        let data = await response.json()
        // console.log(data)
        if(data.cod.toString() === "200")
        {
            
            console.log(data)
            document.getElementById("spnDatetime").innerText = moment().format('ddd, MM MMMM')+" "+moment().format('LT')+" (PK)"
            document.getElementById("txtsearch").value = ""
            document.getElementById("txtsearch").focus()
            document.getElementById("spnLocation").innerText = data.name+", "+data.sys.country
            document.getElementById("weatherImg").src = "img/"+data.weather[0].icon+".png"
            document.getElementById("spnTemp").innerText = Math.round(data.main.temp)+"°"

            document.getElementById("W_hum").innerText = "Humidity: "+data.main.humidity+"%"
            document.getElementById("W_wind").innerText = "Wind: "+(parseInt(Math.round(data.wind.speed)*3.6))+" km/h"
            document.getElementById("W_CloudCover").innerText = "Cloud Cover: "+data.clouds.all+"%"

            document.getElementById("W_Desc").innerText = data.weather[0].main
            document.getElementById("W_TempRange").innerText = data.main.temp_max+"° / "+data.main.temp_min+"°"
            document.getElementById("W_RealFeal").innerText = "Feels Like "+data.main.feels_like+"°"

            const forcastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${ApiKey}&q=${city}`
            let forcastResponse = await fetch(forcastApiUrl)
            let forcastData = await forcastResponse.json()
            
            if(forcastData.cod.toString() === "200")
            {
                console.log(forcastData)

                
                document.getElementById("Desc-time-1").innerText = (parseInt(((forcastData.list[1].dt_txt.split(" "))[1].split(":")[0])) % 12 || 12)+" "+(parseInt(((forcastData.list[1].dt_txt.split(" "))[1].split(":")[0])) >= 12 ? 'pm' : 'am')
                document.getElementById("Desc-img-1").src = "img/"+forcastData.list[1].weather[0].icon+".png"
                document.getElementById("Desc-TempRange-1").innerText = parseFloat(forcastData.list[1].main.temp).toFixed(1)+"°"

                document.getElementById("Desc-time-2").innerText = (parseInt(((forcastData.list[2].dt_txt.split(" "))[1].split(":")[0])) % 12 || 12)+" "+(parseInt(((forcastData.list[2].dt_txt.split(" "))[1].split(":")[0])) >= 12 ? 'pm' : 'am')
                document.getElementById("Desc-img-2").src = "img/"+forcastData.list[2].weather[0].icon+".png"
                document.getElementById("Desc-TempRange-2").innerText = parseFloat(forcastData.list[2].main.temp).toFixed(1)+"°"

                document.getElementById("Desc-time-3").innerText = (parseInt(((forcastData.list[3].dt_txt.split(" "))[1].split(":")[0])) % 12 || 12)+" "+(parseInt(((forcastData.list[3].dt_txt.split(" "))[1].split(":")[0])) >= 12 ? 'pm' : 'am')
                document.getElementById("Desc-img-3").src = "img/"+forcastData.list[3].weather[0].icon+".png"
                document.getElementById("Desc-TempRange-3").innerText = parseFloat(forcastData.list[3].main.temp).toFixed(1)+"°"

                document.getElementById("Desc-time-4").innerText = (parseInt(((forcastData.list[4].dt_txt.split(" "))[1].split(":")[0])) % 12 || 12)+" "+(parseInt(((forcastData.list[4].dt_txt.split(" "))[1].split(":")[0])) >= 12 ? 'pm' : 'am')
                document.getElementById("Desc-img-4").src = "img/"+forcastData.list[4].weather[0].icon+".png"
                document.getElementById("Desc-TempRange-4").innerText = parseFloat(forcastData.list[4].main.temp).toFixed(1)+"°"

                document.getElementById("Desc-time-5").innerText = (parseInt(((forcastData.list[5].dt_txt.split(" "))[1].split(":")[0])) % 12 || 12)+" "+(parseInt(((forcastData.list[5].dt_txt.split(" "))[1].split(":")[0])) >= 12 ? 'pm' : 'am')
                document.getElementById("Desc-img-5").src = "img/"+forcastData.list[5].weather[0].icon+".png"
                document.getElementById("Desc-TempRange-5").innerText = parseFloat(forcastData.list[5].main.temp).toFixed(1)+"°"



                // console.log("Forcast Data Found")
            }
            else
            {
                console.log("Forcast data not found")
            }


        }
        else{
            alert(data.cod+", "+data.message)
        }
        }
        
        
    } catch (error) {
        alert(error)
    }

}



MyFunc(txtinputtext.value.length === 0 ? "Karachi" : txtinputtext.value);

txtinputtext.addEventListener('keypress',(e) =>{
    // console.log()
    if (e.key  === 'Enter') { 
        MyFunc(txtinputtext.value);
        
    }
})

document.getElementById("btnSearch").addEventListener('click',() =>{
    MyFunc(txtinputtext.value);
})





///////Date Time


// async function gettime(){
//     try {
//         // let timeapi = `https://timeapi.io/api/Time/current/coordinate?latitude=${Math.round(data.coord.lat)}&longitude=${Math.round(data.coord.lon)}`
//         let timeapi = `https://timeapi.io/api/Time/current/coordinate?latitude=24&longitude=67`
//             let timeResp = await fetch(timeapi)
//             let timedata = await timeResp.json()
//             console.log(timedata)
//     } catch (error) {
//         console.log("error",error)
//     }
// }

// gettime()
// const latitude = 24;
// const longitude = 67;
// const apiUrl = `https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`;

// fetch(apiUrl,{
//     mode:"no-cors",
//     'Content-Type':'application/json; charset=utf-8',
//     method:'GET',
//     'Access-Control-Allow-Origin':'true'
// })
//   .then(response => {
//     if (!response.ok) {
//         console.log(response)
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('Current time data:', data);
//     // Handle the data as needed
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     // Handle errors here
//   });